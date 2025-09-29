import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Image as ImageIcon, Type, Edit3, RefreshCw, Eye, Search, Filter } from "lucide-react"
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

  // Default positions that will be loaded initially
  const defaultPositions: PositionItem[] = [
    { id: 'enhanced_missionary', title: 'Enhanced Missionary', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'intimate_spooning', title: 'Intimate Spooning', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'empowered_cowgirl', title: 'Empowered Cowgirl', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'passionate_doggy', title: 'Passionate Doggy', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'tantric_lotus', title: 'Tantric Lotus', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'standing_passion', title: 'Standing Passion', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'reverse_cowgirl', title: 'Reverse Cowgirl', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'side_saddle', title: 'Side Saddle', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'butterfly_position', title: 'Butterfly Position', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'bridge_position', title: 'Bridge Position', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'scissors_position', title: 'Scissors Position', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center', isDefault: true },
    { id: 'pretzel_position', title: 'Pretzel Position', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center', isDefault: true }
  ]

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "default", label: "Default Positions" },
    { id: "custom", label: "Custom Positions" }
  ]

  useEffect(() => {
    loadItems()
    document.title = "Scratch Positions Admin | ScratchSexPositions"
  }, [])

  const loadItems = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      let storedItems: PositionItem[] = []

      if (raw) {
        const parsed = JSON.parse(raw)
        storedItems = Array.isArray(parsed) ? parsed : []
      }

      // Merge defaults with stored items, keeping stored versions if they exist
      const mergedItems = defaultPositions.map(defaultItem => {
        const storedItem = storedItems.find(item => item.id === defaultItem.id)
        return storedItem || defaultItem
      })

      // Add any custom items that aren't in defaults
      const customItems = storedItems.filter(item => !defaultPositions.some(def => def.id === item.id))
      const allItems = [...mergedItems, ...customItems]

      setItems(allItems)
      saveItems(allItems) // Save back to ensure defaults are persisted
    } catch (error) {
      console.error('Error loading items:', error)
      setItems(defaultPositions)
    }
  }

  const saveItems = (itemsToSave: PositionItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave))
      setItems(itemsToSave)
    } catch (error) {
      console.error('Error saving items:', error)
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
      // Update existing
      const updated = items.map(item => item.id === editingId ? newItem : item)
      saveItems(updated)
      setMessage({type: 'success', text: 'Position updated successfully!'})
    } else {
      // Add new
      const updated = [...items, newItem]
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
    saveItems(next)
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
              Manage all scratch positions - defaults and custom. Changes reflect immediately in the game.
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
                <Button variant="outline" size="sm" onClick={loadItems}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
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
                  <li>• <strong>Default Positions:</strong> Original 12 positions - can be edited but not deleted</li>
                  <li>• <strong>Custom Positions:</strong> Your added positions - can be edited or deleted</li>
                  <li>• <strong>Real-time Updates:</strong> Changes appear instantly in Scratch Positions game</li>
                  <li>• <strong>Image Management:</strong> All images can be updated with new URLs</li>
                  <li>• <strong>Search & Filter:</strong> Find positions quickly by title or category</li>
                  <li>• <strong>Export Ready:</strong> All positions saved to localStorage for backup</li>
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
