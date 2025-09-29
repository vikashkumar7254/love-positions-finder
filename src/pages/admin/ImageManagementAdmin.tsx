import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"
import { Image as ImageIcon, Upload, Save, Trash2, RefreshCw, Eye, Edit3, Plus, Search, Filter, BarChart3, Download, Image as ImageIcon2 } from "lucide-react"
import { getAllCustomImages, getImageStats, searchImages, getImagesWithoutAltText, bulkUpdateAltText, compressImage, type SiteImageItem } from "@/utils/imageManager"

const ImageManagementAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("homepage")
  const [description, setDescription] = useState("")
  const [altText, setAltText] = useState("")
  const [items, setItems] = useState<SiteImageItem[]>([])
  const [filteredItems, setFilteredItems] = useState<SiteImageItem[]>([])
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showStats, setShowStats] = useState(false)
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())

  const categories = [
    { id: "all", label: "All Categories", color: "bg-gray-500/20 text-gray-600" },
    { id: "homepage", label: "Homepage", color: "bg-blue-500/20 text-blue-600" },
    { id: "blog", label: "Blog", color: "bg-green-500/20 text-green-600" },
    { id: "positions", label: "Positions", color: "bg-purple-500/20 text-purple-600" },
    { id: "games", label: "Games", color: "bg-pink-500/20 text-pink-600" },
    { id: "journey", label: "Journey", color: "bg-orange-500/20 text-orange-600" },
    { id: "general", label: "General", color: "bg-gray-500/20 text-gray-600" }
  ]

  const stats = getImageStats()

  useEffect(() => {
    loadImages()
    document.title = "Image Management Admin | ScratchSexPositions"
  }, [])

  useEffect(() => {
    filterImages()
  }, [items, searchQuery, selectedCategory])

  const loadImages = () => {
    const allImages = getAllCustomImages()
    setItems(allImages)
  }

  const filterImages = () => {
    let filtered = items

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchImages(searchQuery.trim())
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }

  const addOrUpdateItem = async () => {
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

    const id = editingId || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newItem: SiteImageItem = {
      id,
      title: t,
      image: img,
      category,
      description: description.trim() || undefined,
      altText: altText.trim() || undefined
    }

    if (editingId) {
      // Update existing
      const updated = items.map(item => item.id === editingId ? newItem : item)
      setItems(updated)
      setMessage({type: 'success', text: 'Image updated successfully!'})
    } else {
      // Add new
      const next = [...items, newItem]
      setItems(next)
      setMessage({type: 'success', text: 'Image added successfully!'})
    }

    // Reset form
    setTitle("")
    setImage("")
    setCategory("homepage")
    setDescription("")
    setAltText("")
    setEditingId(null)

    // Auto-dismiss success message
    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: SiteImageItem) => {
    setTitle(item.title)
    setImage(item.image)
    setCategory(item.category)
    setDescription(item.description || "")
    setAltText(item.altText || "")
    setEditingId(item.id)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
  }

  const testImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  const handleBulkUpload = async (files: FileList) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        const compressedImage = await compressImage(file, 1200, 0.8)
        return {
          title: file.name.replace(/\.[^/.]+$/, ""),
          image: compressedImage,
          category: "general",
          altText: file.name.replace(/\.[^/.]+$/, "")
        }
      } catch (error) {
        console.error('Failed to compress image:', file.name, error)
        return null
      }
    })

    const results = await Promise.all(uploadPromises)
    const validResults = results.filter(result => result !== null) as SiteImageItem[]

    if (validResults.length > 0) {
      const next = [...items, ...validResults]
      setItems(next)
      setMessage({type: 'success', text: `${validResults.length} images uploaded and compressed successfully!`})
    } else {
      setMessage({type: 'error', text: 'Failed to upload images. Please try again.'})
    }

    setTimeout(() => setMessage(null), 5000)
  }

  const toggleImageSelection = (id: string) => {
    const newSelection = new Set(selectedImages)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedImages(newSelection)
  }

  const bulkDelete = () => {
    const next = items.filter(item => !selectedImages.has(item.id))
    setItems(next)
    setSelectedImages(new Set())
    setMessage({type: 'success', text: `${selectedImages.size} images deleted successfully!`})
    setTimeout(() => setMessage(null), 3000)
  }

  const exportImages = () => {
    const dataStr = JSON.stringify(items, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'site-images-backup.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">
              Advanced Image Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all images with compression, bulk operations, and advanced analytics.
            </p>
          </div>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-blue-600">Total Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{Object.keys(stats.byCategory).length}</div>
                  <div className="text-sm text-green-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(stats.averageSize / 1024)}KB</div>
                  <div className="text-sm text-purple-600">Avg Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{getImagesWithoutAltText().length}</div>
                  <div className="text-sm text-orange-600">Missing Alt Text</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search images by title, description, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
                    <BarChart3 className="w-4 h-4" />
                  </Button>
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

          {/* Bulk Operations */}
          {selectedImages.size > 0 && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-800">
                    {selectedImages.size} images selected
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedImages(new Set())}>
                      Clear
                    </Button>
                    <Button variant="destructive" size="sm" onClick={bulkDelete}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add/Edit Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingId ? 'Edit Site Image' : 'Add New Site Image'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                      placeholder="e.g. Homepage Hero, Blog Romance Category"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                      {categories.slice(1).map(cat => (
                        <Button
                          key={cat.id}
                          variant={category === cat.id ? "romantic" : "outline"}
                          size="sm"
                          onClick={() => setCategory(cat.id)}
                          className="text-xs"
                        >
                          {cat.label}
                        </Button>
                      ))}
                    </div>
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
                  </div>
                  <div>
                    <label className="text-sm font-medium">Alt Text (SEO)</label>
                    <Input
                      value={altText}
                      onChange={e=>setAltText(e.target.value)}
                      placeholder="Describe the image for accessibility"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Input
                      value={description}
                      onChange={e=>setDescription(e.target.value)}
                      placeholder="Brief description of how this image is used"
                    />
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
                    <Save className="w-4 h-4"/>
                    {editingId ? 'Update Image' : 'Add Image'}
                  </Button>
                  <Button variant="outline" onClick={exportImages}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Upload className="w-4 h-4" />
                    Upload Multiple Images
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleBulkUpload(e.target.files)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Images will be automatically compressed to 1200px width at 80% quality
                  </p>
                </div>

                {getImagesWithoutAltText().length > 0 && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon2 className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        {getImagesWithoutAltText().length} images missing alt text
                      </span>
                    </div>
                    <p className="text-xs text-orange-700">
                      Consider adding alt text for better SEO and accessibility.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Images Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Image Gallery ({filteredItems.length})</span>
                <Button variant="outline" size="sm" onClick={() => setBulkMode(!bulkMode)}>
                  {bulkMode ? 'Exit Bulk Mode' : 'Bulk Mode'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No images found. Add some images to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className={`border rounded-lg overflow-hidden ${selectedImages.has(item.id) ? 'ring-2 ring-blue-500' : ''}`}>
                      <div className="h-32 bg-muted overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x128?text=Invalid+URL'
                          }}
                        />
                        {bulkMode && (
                          <div className="absolute top-2 left-2">
                            <input
                              type="checkbox"
                              checked={selectedImages.has(item.id)}
                              onChange={() => toggleImageSelection(item.id)}
                              className="w-4 h-4"
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm truncate">{item.title}</div>
                          <div className={`px-2 py-1 rounded-full text-xs ${categories.find(c => c.id === item.category)?.color || 'bg-gray-100 text-gray-700'}`}>
                            {categories.find(c => c.id === item.category)?.label}
                          </div>
                        </div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</div>
                        )}
                        {!item.altText && (
                          <div className="text-xs text-orange-600 mb-2">⚠️ Missing alt text</div>
                        )}
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
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics Panel */}
          {showStats && (
            <Card>
              <CardHeader>
                <CardTitle>Image Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(stats.byCategory).map(([category, count]) => (
                    <div key={category} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground capitalize">{category}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Guide */}
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-sm">
                <p className="font-semibold text-blue-800 mb-2">📋 Advanced Features:</p>
                <ul className="text-blue-700 space-y-1 text-xs">
                  <li>• <strong>Lazy Loading:</strong> Images load only when visible for better performance</li>
                  <li>• <strong>Image Compression:</strong> Automatic compression for bulk uploads</li>
                  <li>• <strong>Bulk Operations:</strong> Select multiple images for batch operations</li>
                  <li>• <strong>Search & Filter:</strong> Find images quickly by title, category, or description</li>
                  <li>• <strong>Alt Text Management:</strong> Improve SEO with proper alt text</li>
                  <li>• <strong>Analytics:</strong> Track image usage and statistics</li>
                  <li>• <strong>Export/Import:</strong> Backup and restore your image collections</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const ImageManagementAdmin = () => {
  return (
    <AdminProtectedRoute>
      <ImageManagementAdminContent />
    </AdminProtectedRoute>
  )
}

export default ImageManagementAdmin
