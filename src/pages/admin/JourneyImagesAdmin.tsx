import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"
import { Image as ImageIcon, Upload, Save, RefreshCw, Eye } from "lucide-react"

const STORAGE_KEY = 'journey_images_custom'

interface JourneyImageItem {
  id: string
  title: string
  image: string
  style: string
}

const JourneyImagesAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [style, setStyle] = useState("romantic")
  const [items, setItems] = useState<JourneyImageItem[]>([])
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const styles = [
    { id: "romantic", label: "Romantic", color: "bg-romantic/20 text-romantic" },
    { id: "passionate", label: "Passionate", color: "bg-passionate/20 text-passionate" },
    { id: "adventurous", label: "Adventurous", color: "bg-sensual/20 text-sensual" },
    { id: "mixed", label: "Mixed", color: "bg-warm/20 text-warm" }
  ]

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: JourneyImageItem[] = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
    document.title = "Journey Images Admin | ScratchSexPositions"
  }, [])

  const saveItems = (next: JourneyImageItem[]) => {
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

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

    const id = editingId || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newItem: JourneyImageItem = { id, title: t, image: img, style }

    if (editingId) {
      // Update existing
      const next = items.map(item => item.id === editingId ? newItem : item)
      saveItems(next)
      setMessage({type: 'success', text: 'Image updated successfully!'})
    } else {
      // Add new
      const next = [...items, newItem]
      saveItems(next)
      setMessage({type: 'success', text: 'Image added successfully!'})
    }

    // Reset form
    setTitle("")
    setImage("")
    setStyle("romantic")
    setEditingId(null)

    // Auto-dismiss success message
    setTimeout(() => setMessage(null), 5000)
  }

  const editItem = (item: JourneyImageItem) => {
    setTitle(item.title)
    setImage(item.image)
    setStyle(item.style)
    setEditingId(item.id)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    saveItems(next)
  }

  const testImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">
              Journey Images Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Add custom images for the "Create Your Perfect Intimate Journey" section on the homepage.
            </p>
          </div>

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

          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Journey Image' : 'Add New Journey Image'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="e.g. Romantic Evening, Passionate Night"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Give your image a descriptive name</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Style</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {styles.map(s => (
                      <Button
                        key={s.id}
                        variant={style === s.id ? "romantic" : "outline"}
                        size="sm"
                        onClick={() => setStyle(s.id)}
                        className="text-xs"
                      >
                        {s.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
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

              <Button onClick={addOrUpdateItem} variant="romantic" className="flex items-center gap-2">
                <Save className="w-4 h-4"/>
                {editingId ? 'Update Image' : 'Add Image'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Journey Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">
                Total: {items.length} custom images
              </div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No custom images yet. Add some above!</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(it => (
                    <div key={it.id} className="border rounded-lg overflow-hidden">
                      <div className="h-32 bg-muted overflow-hidden">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x128?text=Invalid+URL'
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{it.title}</div>
                          <div className={`px-2 py-1 rounded-full text-xs ${styles.find(s => s.id === it.style)?.color || 'bg-gray-100 text-gray-700'}`}>
                            {styles.find(s => s.id === it.style)?.label}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => editItem(it)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeItem(it.id)}>
                            Remove
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => testImage(it.image)}>
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

          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-sm">
                <p className="font-semibold text-blue-800 mb-2">How it works:</p>
                <ul className="text-blue-700 space-y-1 text-xs">
                  <li>• These images will be used in the "Create Your Perfect Intimate Journey" section</li>
                  <li>• Images are matched by style (romantic, passionate, adventurous, mixed)</li>
                  <li>• If no custom image exists for a style, default images will be used</li>
                  <li>• Click "Test Image" to verify URLs work before saving</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const JourneyImagesAdmin = () => {
  return (
    <AdminProtectedRoute>
      <JourneyImagesAdminContent />
    </AdminProtectedRoute>
  )
}

export default JourneyImagesAdmin
