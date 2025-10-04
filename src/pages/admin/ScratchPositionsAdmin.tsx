import { useEffect, useMemo, useState, useRef } from "react"
import { getPositions as apiGetPositions, savePositions as apiSavePositions } from "@/lib/positionsApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Image as ImageIcon, Type, Edit3, RefreshCw, Eye, Search, Filter, RotateCcw, Upload, Video, FileImage, X, Check, AlertCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"

const STORAGE_KEY = 'scratch_positions_all'

type PositionItem = {
  id: string
  title: string
  image: string
  mediaType?: 'image' | 'gif' | 'video'
  isDefault?: boolean
}

type UploadedFile = {
  file: File
  preview: string
  type: 'image' | 'gif' | 'video'
}

const ScratchPositionsAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<PositionItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // No default positions - admin will add manually


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

  // File upload handling
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size too large. Maximum 10MB allowed.' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    // Check file type
    const fileType = file.type
    let mediaType: 'image' | 'gif' | 'video' = 'image'
    
    if (fileType.startsWith('video/')) {
      mediaType = 'video'
    } else if (fileType === 'image/gif') {
      mediaType = 'gif'
    } else if (!fileType.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Unsupported file type. Please upload image, GIF, or video files only.' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    const preview = URL.createObjectURL(file)
    setUploadedFile({ file, preview, type: mediaType })
    setImage('') // Clear URL input when file is uploaded
  }

  // Convert file to base64 for storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // Optimize image for display
  const optimizeImage = (base64: string, maxWidth: number = 400, maxHeight: number = 300): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          resolve(base64)
          return
        }

        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img
        const aspectRatio = width / height
        
        if (width > maxWidth) {
          width = maxWidth
          height = width / aspectRatio
        }
        
        if (height > maxHeight) {
          height = maxHeight
          width = height * aspectRatio
        }

        canvas.width = width
        canvas.height = height
        
        // Draw image with optimization
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convert to base64 with quality optimization
        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.8)
        resolve(optimizedBase64)
      }
      img.src = base64
    })
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
    
    if (!img && !uploadedFile) {
      setMessage({type: 'error', text: 'Please upload a file or enter an image URL'})
      setTimeout(() => setMessage(null), 3000)
      return
    }

    setIsUploading(true)
    let finalImageUrl = img

    // Handle file upload
    if (uploadedFile) {
      try {
        const base64 = await fileToBase64(uploadedFile.file)
        
        // Optimize image if it's not a video or GIF
        if (uploadedFile.type === 'image') {
          finalImageUrl = await optimizeImage(base64)
        } else {
          finalImageUrl = base64
        }
      } catch (error) {
        setMessage({type: 'error', text: 'Failed to process uploaded file'})
        setTimeout(() => setMessage(null), 3000)
        setIsUploading(false)
        return
      }
    } else if (img) {
    // Check if URL is valid
    try {
      new URL(img)
    } catch {
      setMessage({type: 'error', text: 'Please enter a valid image URL (must start with http:// or https://)'})
      setTimeout(() => setMessage(null), 3000)
        setIsUploading(false)
      return
      }
    }

    const id = editingId || toSlug(t) || `custom-${Date.now()}`
    const newItem: PositionItem = { 
      id, 
      title: t, 
      image: finalImageUrl,
      mediaType: uploadedFile?.type || 'image',
      isDefault: false
    }

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
    setUploadedFile(null)
    setIsUploading(false)

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: PositionItem) => {
    setTitle(item.title)
    setImage(item.image)
    setEditingId(item.id)
    setUploadedFile(null) // Clear uploaded file when editing
  }

  const clearUploadedFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview)
    }
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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

    return filtered
  }, [items, searchQuery])

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
                {editingId ? <Edit3 className="w-5 h-5"/> : <Plus className="w-5 h-5"/>}
                {editingId ? 'Edit Position' : 'Add New Position'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Type className="w-4 h-4"/> Title *
                </label>
                <Input
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                  placeholder="e.g. Romantic Lift, Passionate Embrace"
                />
                <p className="text-xs text-muted-foreground mt-1">Give your position a descriptive name</p>
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium block">Media Upload *</label>
                
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <p className="text-sm text-gray-500">
                        or drag and drop your file here
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      Supports: JPG, PNG, GIF, MP4, WebM (Max 10MB)
                    </p>
                  </div>
                </div>

                {/* URL Input */}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      value={image}
                      onChange={e=>setImage(e.target.value)}
                      placeholder="Or enter image/video URL..."
                      disabled={!!uploadedFile}
                    />
                  </div>
                  {uploadedFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearUploadedFile}
                    >
                      <X className="w-4 h-4" />
                  </Button>
                  )}
                </div>

                {/* Preview */}
                {(image || uploadedFile) && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preview</label>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
                      {uploadedFile ? (
                        uploadedFile.type === 'video' ? (
                          <video
                            src={uploadedFile.preview}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={uploadedFile.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <img
                          src={image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'
                          }}
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          uploadedFile?.type === 'video' ? 'bg-blue-500 text-white' :
                          uploadedFile?.type === 'gif' ? 'bg-purple-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {uploadedFile?.type?.toUpperCase() || 'IMAGE'}
                        </span>
                      </div>
                    </div>
                    {image && !uploadedFile && (
                      <Button variant="outline" size="sm" onClick={() => testImage(image)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Test URL
                      </Button>
                    )}
                </div>
              )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  onClick={addOrUpdateItem} 
                  variant="romantic" 
                  className="flex items-center gap-2"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                  {editingId ? <Edit3 className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                  {editingId ? 'Update Position' : 'Add Position'}
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={() => {
                    setTitle("")
                    setImage("")
                    setEditingId(null)
                    clearUploadedFile()
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-muted overflow-hidden relative">
                        {item.mediaType === 'video' ? (
                          <video
                            src={item.image}
                            className="w-full h-full object-cover"
                            muted
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/200x160?text=Invalid+Video'
                            }}
                          />
                        ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/200x160?text=Invalid+URL'
                          }}
                        />
                        )}
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.mediaType === 'video' ? 'bg-blue-500 text-white' :
                            item.mediaType === 'gif' ? 'bg-purple-500 text-white' :
                            'bg-green-500 text-white'
                          }`}>
                            {item.mediaType?.toUpperCase() || 'IMAGE'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="font-medium text-sm line-clamp-2 flex-1">{item.title}</div>
                          <div className="flex gap-1 ml-2">
                            <Button variant="outline" size="sm" onClick={() => editItem(item)} title="Edit">
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => removeItem(item.id)} title="Delete">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => testImage(item.image)} title="Preview">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>ID: {item.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-sm">
                <p className="font-semibold text-blue-800 mb-3 text-lg">🚀 Enhanced Position Management Guide:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">📁 File Upload Features:</h4>
                    <ul className="text-blue-700 space-y-1 text-xs">
                      <li>• <strong>Local File Upload:</strong> Upload images/videos directly from your PC</li>
                      <li>• <strong>Auto Optimization:</strong> Images automatically resized and optimized</li>
                      <li>• <strong>GIF Support:</strong> Upload animated GIFs for dynamic content</li>
                      <li>• <strong>Video Support:</strong> Upload MP4, WebM videos (max 10MB)</li>
                      <li>• <strong>Smart Preview:</strong> Real-time preview before saving</li>
                      <li>• <strong>URL Fallback:</strong> Still supports external image URLs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Enhanced Features:</h4>
                <ul className="text-blue-700 space-y-1 text-xs">
                      <li>• <strong>Rich Metadata:</strong> Add descriptions, difficulty, duration, tags</li>
                      <li>• <strong>Category System:</strong> Organize by Romantic, Passionate, etc.</li>
                      <li>• <strong>Difficulty Levels:</strong> Easy, Medium, Hard, Expert</li>
                      <li>• <strong>Tag System:</strong> Add multiple tags for better organization</li>
                      <li>• <strong>Real-time Updates:</strong> Changes appear instantly in game</li>
                      <li>• <strong>Complete Control:</strong> Full CRUD operations on all positions</li>
                </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-xs">
                    <strong>💡 Pro Tip:</strong> Upload high-quality images (any size) - they'll be automatically optimized to fit perfectly in the scratch cards while maintaining aspect ratio!
                  </p>
                </div>
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
