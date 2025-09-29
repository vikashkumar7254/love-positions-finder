import { useEffect, useMemo, useState } from "react"
import { getPositions as apiGetPositions, savePositions as apiSavePositions } from "@/lib/positionsApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Image as ImageIcon, Type, Edit3, RefreshCw, Eye, Search, Filter, RotateCcw } from "lucide-react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"

const STORAGE_KEY = 'scratch_positions_all'

type PositionItem = {
  id: string
  title: string
  image: string
  isDefault?: boolean
  category?: string
}

const ScratchPositionsAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [items, setItems] = useState<PositionItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  // No default positions - admin will add manually

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "default", label: "Default Positions" },
    { id: "custom", label: "Custom Positions" }
  ]

  useEffect(() => {
    // Initial fetch from API
    const init = async () => {
      try {
        const storedItems = await apiGetPositions()
        console.log('📂 Admin: Loading positions from API:', storedItems.length)
        console.log('📝 Position titles:', storedItems.map(p => p.title))
        setItems(storedItems)
      } catch (error) {
        console.error('Error loading items from API:', error)
        setItems([])
      }
      document.title = "Scratch Positions Admin | ScratchSexPositions"
    }
    init()
  }, [])

  const cleanDuplicates = (items: PositionItem[]): PositionItem[] => {
    const seen = new Set<string>()
    return items.filter(item => {
      if (seen.has(item.id)) {
        console.log('🧹 Admin: Removing duplicate position:', item.id)
        return false
      }
      seen.add(item.id)
      return true
    })
  }

  const loadItems = async () => {
    try {
      const storedItems = await apiGetPositions()
      const cleanedItems = cleanDuplicates(storedItems)
      if (cleanedItems.length !== storedItems.length) {
        console.log('🧹 Admin: Found and removed', storedItems.length - cleanedItems.length, 'duplicate positions')
        await apiSavePositions(cleanedItems)
      }
      console.log('📂 Admin: Loading positions from API:', cleanedItems.length)
      setItems(cleanedItems)
    } catch (error) {
      console.error('Error loading items from API:', error)
      setItems([])
    }
  }

  const saveItems = async (itemsToSave: PositionItem[]) => {
    try {
      console.log('💾 Admin: Saving', itemsToSave.length, 'positions to API')
      console.log('📝 Titles:', itemsToSave.map(p => p.title))

      // Persist to API
      const ok = await apiSavePositions(itemsToSave)
      if (!ok) {
        console.error('❌ Error saving via API')
        setMessage({ type: 'error', text: 'Failed to save positions to server.' })
        setTimeout(() => setMessage(null), 3000)
        return
      }

      // Update UI state
      setItems(itemsToSave)

      // Notify clients (same-tab + cross-tab)
      const dataWithTimestamp = {
        positions: itemsToSave,
        timestamp: Date.now(),
        version: Math.random().toString(36).slice(2)
      }

      // Custom event
      window.dispatchEvent(new CustomEvent('scratchPositionsUpdated', { detail: dataWithTimestamp }))

      // BroadcastChannel
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('scratch-positions-sync')
        channel.postMessage(dataWithTimestamp)
        channel.close()
      }

      console.log('📡 Admin: Triggered sync events after API save')
      console.log('✅ Admin: Saved to API successfully')
    } catch (error) {
      console.error('❌ Error saving items:', error)
    }
  }

  const toSlug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const addOrUpdateItem = () => {
    const t = title.trim()
    const img = image.trim()

    // Validation
    if (!t) {
      setMessage({type: 'error', text: 'Please enter a title'})
      setTimeout(() => setMessage(null), 3000)
      return
    }
    if (!img) {
      setMessage({type: 'error', text: 'Please enter an image URL'})
      setTimeout(() => setMessage(null), 3000)
      return
    }

    // Check if URL is valid
    try {
      new URL(img)
    } catch {
      setMessage({type: 'error', text: 'Please enter a valid image URL (must start with http:// or https://)'})
      setTimeout(() => setMessage(null), 3000)
      return
    }

    const id = editingId || toSlug(t) || `custom-${Date.now()}`
    const newItem: PositionItem = { id, title: t, image: img, isDefault: false }

    if (editingId) {
      // Update existing - replace the item with matching ID
      const updated = items.map(item => item.id === editingId ? newItem : item)
      console.log('✏️ Admin: Updating position', id)
      saveItems(updated)
      setMessage({type: 'success', text: 'Position updated successfully!'})
    } else {
      // Add new - check if ID already exists to prevent duplicates
      const existingItem = items.find(item => item.id === id)
      if (existingItem) {
        setMessage({type: 'error', text: 'A position with this title already exists. Please choose a different title.'})
        setTimeout(() => setMessage(null), 3000)
        return
      }

      const updated = [...items, newItem]
      console.log('➕ Admin: Adding new position', id)
      saveItems(updated)
      setMessage({type: 'success', text: 'Position added successfully!'})
    }

    // Reset form
    setTitle("")
    setImage("")
    setEditingId(null)

    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: PositionItem) => {
    setTitle(item.title)
    setImage(item.image)
    setEditingId(item.id)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    console.log('🗑️ Admin: Removing position', id, '- remaining:', next.length)

    // Use the enhanced saveItems function for consistent sync
    saveItems(next)

    setMessage({
      type: 'success',
      text: `Position removed! ${next.length} positions remaining.`
    })
    setTimeout(() => setMessage(null), 3000)
  }

  // Reset to defaults function removed - no default positions

  const permanentReset = () => {
    if (confirm('⚠️ PERMANENT RESET: This will clear all positions on server and start fresh. This action cannot be undone. Proceed?')) {
      console.log('🔥 Admin: PERMANENT RESET - clearing all data via API')
      setItems([])
      saveItems([])
      setMessage({type: 'success', text: 'System permanently reset on server! Starting with empty state.'})
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const testImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  const filteredItems = useMemo(() => {
    let filtered = items

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item =>
        selectedCategory === 'default' ? item.isDefault : !item.isDefault
      )
    }

    return filtered
  }, [items, searchQuery, selectedCategory])

  const stats = useMemo(() => {
    const defaults = items.filter(item => item.isDefault).length
    const customs = items.filter(item => !item.isDefault).length
    return { defaults, customs, total: defaults + customs }
  }, [items])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">
              Comprehensive Scratch Positions Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Add and manage scratch positions manually. Complete admin control with real-time game updates.
            </p>
          </div>

          {/* Stats */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.defaults}</div>
                  <div className="text-sm text-blue-600">Default Positions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.customs}</div>
                  <div className="text-sm text-green-600">Custom Positions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                  <div className="text-sm text-purple-600">Total Positions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search positions by title or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "romantic" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Add/Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Position' : 'Add New Position'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Type className="w-4 h-4"/> Title
                  </label>
                  <Input
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="e.g. Romantic Lift, Passionate Embrace"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Give your position a descriptive name</p>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1">
                    <ImageIcon className="w-4 h-4"/> Image URL
                  </label>
                  <Input
                    value={image}
                    onChange={e=>setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Must start with http:// or https://</p>
                </div>
              </div>

              {image && (
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Invalid+URL'
                    }} />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => testImage(image)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Test Image
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={addOrUpdateItem} variant="romantic" className="flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                  {editingId ? 'Update Position' : 'Add Position'}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={() => {
                    setTitle("")
                    setImage("")
                    setEditingId(null)
                  }}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Positions Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Positions ({filteredItems.length})</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={loadItems}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    if (confirm('Clear ALL positions on server? This will remove everything and the game will show empty state.')) {
                      console.log('🗑️ Admin: Clearing all positions via API')
                      saveItems([])
                      setMessage({type: 'success', text: 'All positions cleared from server!'})
                      setTimeout(() => setMessage(null), 3000)
                    }
                  }}>
                    🗑️ Clear All
                  </Button>
                  <Button variant="destructive" size="sm" onClick={permanentReset} className="bg-red-600 hover:bg-red-700">
                    🔥 Permanent Reset
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    if (confirm('🚨 FORCE CLEAR: This will clear ALL localStorage data and reload the page. This will completely reset everything. Are you sure?')) {
                      localStorage.clear()
                      window.location.reload()
                    }
                  }} className="bg-red-800 hover:bg-red-900">
                    💥 Force Clear All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No positions found. Add some positions to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className={`border rounded-lg overflow-hidden ${item.isDefault ? 'border-blue-200 bg-blue-50/50' : 'border-green-200 bg-green-50/50'}`}>
                      <div className="h-32 bg-muted overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x128?text=Invalid+URL'
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.isDefault
                              ? 'bg-blue-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}>
                            {item.isDefault ? 'Default' : 'Custom'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm truncate">{item.title}</div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => editItem(item)}>
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => testImage(item.image)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-sm">
                <p className="font-semibold text-blue-800 mb-2">📋 Management Guide:</p>
                <ul className="text-blue-700 space-y-1 text-xs">
                  <li>• <strong>Manual Management:</strong> Add all positions manually - no default positions provided</li>
                  <li>• <strong>Permanent Deletion:</strong> Deleted positions are permanently removed and won't restore</li>
                  <li>• <strong>Clear All:</strong> Remove all positions from localStorage completely</li>
                  <li>• <strong>Permanent Reset:</strong> Complete system reset - clears everything and starts fresh</li>
                  <li>• <strong>Real-time Updates:</strong> Changes appear instantly in Scratch Positions game</li>
                  <li>• <strong>Image Management:</strong> All images must be added with valid URLs</li>
                  <li>• <strong>Search & Filter:</strong> Find positions quickly by title or category</li>
                  <li>• <strong>Complete Control:</strong> Admin has full control over all positions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const ScratchPositionsAdmin = () => {
  return (
    <AdminProtectedRoute>
      <ScratchPositionsAdminContent />
    </AdminProtectedRoute>
  )
}

export default ScratchPositionsAdmin
