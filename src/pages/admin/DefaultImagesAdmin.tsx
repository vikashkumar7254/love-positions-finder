import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"
import { Image as ImageIcon, Upload, Save, Trash2, RefreshCw, Eye, Edit3, Plus, Search, Filter, BarChart3, Download, Settings, Palette } from "lucide-react"

const STORAGE_KEY = 'default_images_custom'

interface DefaultImageItem {
  id: string
  title: string
  image: string
  category: string
  description: string
  isActive: boolean
  createdAt: string
}

const DefaultImagesAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("journey")
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<DefaultImageItem[]>([])
  const [filteredItems, setFilteredItems] = useState<DefaultImageItem[]>([])
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showStats, setShowStats] = useState(false)

  const categories = [
    { id: "all", label: "All Categories", color: "bg-gray-500/20 text-gray-600" },
    { id: "journey", label: "Journey", color: "bg-orange-500/20 text-orange-600" },
    { id: "romantic", label: "Romantic", color: "bg-pink-500/20 text-pink-600" },
    { id: "passionate", label: "Passionate", color: "bg-red-500/20 text-red-600" },
    { id: "adventurous", label: "Adventurous", color: "bg-purple-500/20 text-purple-600" },
    { id: "sensual", label: "Sensual", color: "bg-rose-500/20 text-rose-600" },
    { id: "playful", label: "Playful", color: "bg-yellow-500/20 text-yellow-600" },
    { id: "luxurious", label: "Luxurious", color: "bg-amber-500/20 text-amber-600" },
    { id: "general", label: "General", color: "bg-blue-500/20 text-blue-600" }
  ]

  useEffect(() => {
    loadImages()
    document.title = "Default Images Admin | Love Positions Finder"
  }, [])

  useEffect(() => {
    filterImages()
  }, [items, searchQuery, selectedCategory])

  const loadImages = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: DefaultImageItem[] = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
  }

  const filterImages = () => {
    let filtered = items

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }

  const addOrUpdateItem = () => {
    const t = title.trim()
    const img = image.trim()
    const desc = description.trim()

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

    const id = editingId || `default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newItem: DefaultImageItem = { 
      id, 
      title: t, 
      image: img, 
      category,
      description: desc,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    if (editingId) {
      // Update existing
      const next = items.map(item => item.id === editingId ? newItem : item)
      setItems(next)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      setMessage({type: 'success', text: 'Default image updated successfully!'})
    } else {
      // Add new
      const next = [...items, newItem]
      setItems(next)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      setMessage({type: 'success', text: 'Default image added successfully!'})
    }

    // Reset form
    setTitle("")
    setImage("")
    setDescription("")
    setCategory("journey")
    setEditingId(null)

    // Auto-dismiss success message
    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: DefaultImageItem) => {
    setTitle(item.title)
    setImage(item.image)
    setDescription(item.description)
    setCategory(item.category)
    setEditingId(item.id)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setMessage({type: 'success', text: 'Default image removed successfully!'})
    setTimeout(() => setMessage(null), 3000)
  }

  const toggleActive = (id: string) => {
    const next = items.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    )
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setMessage({type: 'success', text: 'Status updated successfully!'})
    setTimeout(() => setMessage(null), 3000)
  }

  const testImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  const getStats = () => {
    const total = items.length
    const active = items.filter(item => item.isActive).length
    const inactive = total - active
    const byCategory = categories.reduce((acc, cat) => {
      if (cat.id === 'all') return acc
      acc[cat.id] = items.filter(item => item.category === cat.id).length
      return acc
    }, {} as Record<string, number>)

    return { total, active, inactive, byCategory }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-romantic/20 rounded-xl">
                <Palette className="w-8 h-8 text-romantic" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-romantic via-passionate to-romantic bg-clip-text text-transparent">
                  Default Images Management
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Manage default images used across the application
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card variant="elegant" className="bg-gradient-to-br from-romantic/10 to-romantic/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-romantic">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Images</div>
              </CardContent>
            </Card>
            <Card variant="elegant" className="bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card variant="elegant" className="bg-gradient-to-br from-orange-500/10 to-orange-500/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.inactive}</div>
                <div className="text-sm text-muted-foreground">Inactive</div>
              </CardContent>
            </Card>
            <Card variant="elegant" className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Form */}
            <div className="lg:col-span-1">
              <Card variant="elegant" className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-romantic" />
                    {editingId ? 'Edit Default Image' : 'Add New Default Image'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title *</label>
                    <Input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Enter image title..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Category *</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                      {categories.filter(cat => cat.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-1">
                      <ImageIcon className="w-4 h-4"/> Image URL *
                    </label>
                    <Input
                      value={image}
                      onChange={e => setImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Must be a valid image URL
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                    <Textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Brief description of this default image..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={addOrUpdateItem}
                      className="flex-1"
                      disabled={!title.trim() || !image.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingId ? 'Update' : 'Add'} Image
                    </Button>
                    {editingId && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTitle("")
                          setImage("")
                          setDescription("")
                          setCategory("journey")
                          setEditingId(null)
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>

                  {message && (
                    <div className={`p-3 rounded-md text-sm ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {message.text}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Images List */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <Card variant="elegant" className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search images..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images Grid */}
              <div className="space-y-4">
                {filteredItems.length === 0 ? (
                  <Card variant="elegant">
                    <CardContent className="text-center py-12">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchQuery || selectedCategory !== 'all' 
                          ? 'No images found matching your criteria.' 
                          : 'No default images yet. Add some above!'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map(item => (
                      <Card key={item.id} variant="elegant" className={`${!item.isActive ? 'opacity-60' : ''}`}>
                        <div className="relative">
                          <div className="h-48 bg-muted overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'
                              }}
                            />
                          </div>
                          <div className="absolute top-2 left-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.isActive
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-500 text-white'
                            }`}>
                              {item.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              categories.find(cat => cat.id === item.category)?.color || 'bg-gray-500 text-white'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => testImage(item.image)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => editItem(item)}
                            >
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleActive(item.id)}
                            >
                              {item.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const DefaultImagesAdmin = () => {
  return (
    <AdminProtectedRoute>
      <DefaultImagesAdminContent />
    </AdminProtectedRoute>
  )
}

export default DefaultImagesAdmin
