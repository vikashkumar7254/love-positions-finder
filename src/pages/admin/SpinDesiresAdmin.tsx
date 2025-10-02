import { useEffect, useMemo, useState } from "react"
import { getSpinDesires as apiGetDesires, saveSpinDesires as apiSaveDesires, DEFAULT_DESIRES, DEFAULT_CATEGORY_IMAGES } from "@/lib/spinDesiresApi"
import type { SpinDesireItem } from "@/lib/spinDesiresApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Image as ImageIcon, Type, Edit3, RefreshCw, Eye, Search, Filter, RotateCcw, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"

const SpinDesiresAdminContent = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState<SpinDesireItem['category']>('romantic')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [items, setItems] = useState<SpinDesireItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const isDev = (import.meta as any)?.env?.DEV || (import.meta as any)?.env?.VITE_SHOW_DEBUG === 'true'

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "romantic", label: "Romantic" },
    { id: "sensual", label: "Sensual" },
    { id: "passionate", label: "Passionate" },
    { id: "playful", label: "Playful" },
    { id: "luxurious", label: "Luxurious" }
  ]

  useEffect(() => {
    // Initial fetch from API
    const init = async () => {
      try {
        const storedItems = await apiGetDesires()
        console.log('📂 SpinDesires Admin: Loading desires from API:', storedItems.length)
        setItems(storedItems)
      } catch (error) {
        console.error('Error loading desires from API:', error)
        setItems([])
      }
      document.title = "Spin Desires Admin | ScratchSexPositions"
    }
    init()
  }, [])

  const loadItems = async () => {
    try {
      const storedItems = await apiGetDesires()
      console.log('📂 SpinDesires Admin: Loading desires from API:', storedItems.length)
      setItems(storedItems)
    } catch (error) {
      console.error('Error loading desires from API:', error)
      setItems([])
    }
  }

  const saveItems = async (itemsToSave: SpinDesireItem[]) => {
    try {
      console.log('💾 SpinDesires Admin: Saving', itemsToSave.length, 'desires to API')

      const ok = await apiSaveDesires(itemsToSave)
      if (!ok) {
        console.error('❌ Error saving via API')
        setMessage({ type: 'error', text: 'Failed to save desires to server.' })
        setTimeout(() => setMessage(null), 3000)
        return
      }

      // Update UI state
      setItems(itemsToSave)

      // Notify clients (same-tab + cross-tab)
      const dataWithTimestamp = {
        desires: itemsToSave,
        timestamp: Date.now(),
        version: Math.random().toString(36).slice(2)
      }

      // Custom event
      window.dispatchEvent(new CustomEvent('spinDesiresUpdated', { detail: dataWithTimestamp }))

      // BroadcastChannel
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('spin-desires-sync')
        channel.postMessage(dataWithTimestamp)
        channel.close()
      }

      console.log('📡 SpinDesires Admin: Triggered sync events after API save')
      console.log('✅ SpinDesires Admin: Saved to API successfully')
    } catch (error) {
      console.error('❌ Error saving desires:', error)
    }
  }

  const toSlug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const addOrUpdateItem = () => {
    const t = title.trim()
    const desc = description.trim()
    const img = image.trim() || DEFAULT_CATEGORY_IMAGES[category]

    // Validation
    if (!t) {
      setMessage({type: 'error', text: 'Please enter a title'})
      setTimeout(() => setMessage(null), 3000)
      return
    }

    // Check if URL is valid (if custom image provided)
    if (image.trim()) {
      try {
        new URL(img)
      } catch {
        setMessage({type: 'error', text: 'Please enter a valid image URL (must start with http:// or https://)'})
        setTimeout(() => setMessage(null), 3000)
        return
      }
    }

    const id = editingId || `${category}-${toSlug(t)}` || `${category}-${Date.now()}`
    const newItem: SpinDesireItem = { 
      id, 
      title: t, 
      description: desc || undefined,
      category,
      image: img, 
      isDefault: false 
    }

    if (editingId) {
      // Update existing
      const updated = items.map(item => item.id === editingId ? newItem : item)
      console.log('✏️ SpinDesires Admin: Updating desire', id)
      saveItems(updated)
      setMessage({type: 'success', text: 'Desire updated successfully!'})
    } else {
      // Add new - check if ID already exists
      const existingItem = items.find(item => item.id === id)
      if (existingItem) {
        setMessage({type: 'error', text: 'A desire with this title already exists in this category. Please choose a different title.'})
        setTimeout(() => setMessage(null), 3000)
        return
      }

      const updated = [...items, newItem]
      console.log('➕ SpinDesires Admin: Adding new desire', id)
      saveItems(updated)
      setMessage({type: 'success', text: 'Desire added successfully!'})
    }

    // Reset form
    setTitle("")
    setDescription("")
    setImage("")
    setCategory('romantic')
    setEditingId(null)

    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: SpinDesireItem) => {
    setTitle(item.title)
    setDescription(item.description || "")
    setImage(item.image)
    setCategory(item.category)
    setEditingId(item.id)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    console.log('🗑️ SpinDesires Admin: Removing desire', id, '- remaining:', next.length)
    saveItems(next)
    setMessage({
      type: 'success',
      text: `Desire removed! ${next.length} desires remaining.`
    })
    setTimeout(() => setMessage(null), 3000)
  }

  const resetToDefaults = () => {
    if (confirm('Reset to default desires? This will replace all current desires with the default set.')) {
      console.log('🔄 SpinDesires Admin: Resetting to defaults')
      saveItems(DEFAULT_DESIRES)
      setMessage({type: 'success', text: 'Reset to default desires successfully!'})
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const useDefaultImage = () => {
    setImage(DEFAULT_CATEGORY_IMAGES[category])
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
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    return filtered
  }, [items, searchQuery, selectedCategory])

  const stats = useMemo(() => {
    const byCategory = categories.slice(1).reduce((acc, cat) => {
      acc[cat.id] = items.filter(item => item.category === cat.id).length
      return acc
    }, {} as Record<string, number>)
    
    const defaults = items.filter(item => item.isDefault).length
    const customs = items.filter(item => !item.isDefault).length
    
    return { byCategory, defaults, customs, total: defaults + customs }
  }, [items])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">
              Spin for Desire Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage wheel desires and categories. Changes appear instantly in the Spin for Desire game.
            </p>
          </div>

          {/* Stats */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                {categories.slice(1).map(cat => (
                  <div key={cat.id}>
                    <div className="text-2xl font-bold text-purple-600">{stats.byCategory[cat.id] || 0}</div>
                    <div className="text-sm text-purple-600 capitalize">{cat.label}</div>
                  </div>
                ))}
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.total}</div>
                  <div className="text-sm text-green-600">Total Desires</div>
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
                    placeholder="Search desires by title, description, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
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
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {editingId ? 'Edit Desire' : 'Add New Desire'}
              </CardTitle>
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
                    placeholder="e.g. Romantic Dinner, Sensual Massage"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={category} onValueChange={(value: SpinDesireItem['category']) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="sensual">Sensual</SelectItem>
                      <SelectItem value="passionate">Passionate</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="luxurious">Luxurious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                <Textarea
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                  placeholder="Brief description of this desire..."
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <ImageIcon className="w-4 h-4"/> Image URL (Optional)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={image}
                    onChange={e=>setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg (leave empty for default)"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={useDefaultImage}>
                    Use Default
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setImage('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center')}
                    className="text-xs"
                  >
                    Romantic
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setImage('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center')}
                    className="text-xs"
                  >
                    Passionate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setImage('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center')}
                    className="text-xs"
                  >
                    Adventurous
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to use default image for {category} category
                </p>
              </div>

              {(image || DEFAULT_CATEGORY_IMAGES[category]) && (
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border">
                    <img 
                      src={image || DEFAULT_CATEGORY_IMAGES[category]} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Invalid+URL'
                      }} 
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => testImage(image || DEFAULT_CATEGORY_IMAGES[category])}>
                    <Eye className="w-4 h-4 mr-2" />
                    Test Image
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={addOrUpdateItem} variant="romantic" className="flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                  {editingId ? 'Update Desire' : 'Add Desire'}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={() => {
                    setTitle("")
                    setDescription("")
                    setImage("")
                    setCategory('romantic')
                    setEditingId(null)
                  }}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Desires Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Desires ({filteredItems.length})</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={loadItems}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetToDefaults}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    if (confirm('Clear ALL desires on server? This will remove everything and the game will show empty state.')) {
                      console.log('🗑️ SpinDesires Admin: Clearing all desires via API')
                      saveItems([])
                      setMessage({type: 'success', text: 'All desires cleared from server!'})
                      setTimeout(() => setMessage(null), 3000)
                    }
                  }}>
                    🗑️ Clear All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No desires found. Add some desires to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className={`border rounded-lg overflow-hidden ${
                      item.isDefault ? 'border-blue-200 bg-blue-50/50' : 'border-green-200 bg-green-50/50'
                    }`}>
                      <div className="h-32 bg-muted overflow-hidden relative group cursor-pointer" onClick={() => editItem(item)}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x128?text=Invalid+URL'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 rounded-full p-2">
                              <Edit3 className="w-4 h-4 text-gray-700" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.isDefault
                              ? 'bg-blue-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}>
                            {item.isDefault ? 'Default' : 'Custom'}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white capitalize">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black/50 text-white text-xs px-2 py-1 rounded text-center">
                            Click to edit image
                          </div>
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
                        {item.description && (
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
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
        </div>
      </main>
    </div>
  )
}

const SpinDesiresAdmin = () => {
  return (
    <AdminProtectedRoute>
      <SpinDesiresAdminContent />
    </AdminProtectedRoute>
  )
}

export default SpinDesiresAdmin
