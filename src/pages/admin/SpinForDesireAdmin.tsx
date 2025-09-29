import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Image as ImageIcon, Type, Sparkles, Heart, Zap, Star, Crown } from "lucide-react"
import { desireItems } from "@/data/desireItems"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"

const STORAGE_KEY = 'spin_for_desire_custom'

type DesireItem = {
  id: string
  title: string
  description: string
  image: string
  category: 'romantic' | 'passionate' | 'playful' | 'sensual'
  color: string
}

const categoryIcons = {
  romantic: Heart,
  passionate: Zap,
  playful: Star,
  sensual: Crown,
}

const categoryColors = {
  romantic: '#ff6b9d',
  passionate: '#f8b500',
  playful: '#6c5ce7',
  sensual: '#c44569',
}

const SpinForDesireAdminContent = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState<'romantic' | 'passionate' | 'playful' | 'sensual'>('romantic')
  const [items, setItems] = useState<DesireItem[]>([])
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const defaultsCount = useMemo(() => desireItems.length, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: DesireItem[] = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
    document.title = "Spin for Desire Admin | ScratchSexPositions"
  }, [])

  const saveItems = (next: DesireItem[]) => {
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const toSlug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const addItem = () => {
    const t = title.trim()
    const desc = description.trim()
    const img = image.trim()

    // Validation
    if (!t) {
      setMessage({type: 'error', text: 'Please enter a title'})
      setTimeout(() => setMessage(null), 3000)
      return
    }
    if (!desc) {
      setMessage({type: 'error', text: 'Please enter a description'})
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

    const id = toSlug(t) || `item-${Date.now()}`
    const next = [...items, {
      id,
      title: t,
      description: desc,
      image: img,
      category,
      color: categoryColors[category]
    }]

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setItems(next)
      setTitle("")
      setDescription("")
      setImage("")
      setCategory('romantic')
      setMessage({type: 'success', text: 'Desire item added successfully! Refresh the spin page to see it.'})

      // Auto-dismiss success message
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({type: 'error', text: 'Failed to save. Please try again.'})
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    saveItems(next)
  }

  const updateItem = (id: string, updates: Partial<DesireItem>) => {
    const next = items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
    saveItems(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">Spin for Desire Admin</h1>
            <p className="text-muted-foreground mt-2">Add desire items with title, description, image, and category. These will appear in Spin for Desire game.</p>
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
              <CardTitle>Add New Desire Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><Type className="w-4 h-4"/> Title</label>
                  <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Romantic Candlelight Dinner" />
                  <p className="text-xs text-muted-foreground mt-1">Give your desire item a catchy title</p>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4"/> Category</label>
                  <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="romantic">❤️ Romantic</SelectItem>
                      <SelectItem value="passionate">🔥 Passionate</SelectItem>
                      <SelectItem value="playful">⭐ Playful</SelectItem>
                      <SelectItem value="sensual">👑 Sensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1"><Type className="w-4 h-4"/> Description</label>
                <textarea
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                  placeholder="Describe what this desire item involves..."
                  className="w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-romantic min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">Detailed description of the desire experience</p>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1"><ImageIcon className="w-4 h-4"/> Image URL</label>
                <Input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
                <p className="text-xs text-muted-foreground mt-1">Must start with http:// or https://</p>
              </div>

              <Button onClick={addItem} variant="romantic" className="flex items-center gap-2"><Plus className="w-4 h-4"/> Add Desire Item</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Custom Desire Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">Defaults: {defaultsCount} • Custom: {items.length} • Total: {defaultsCount + items.length}</div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No custom items yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(it => {
                    const IconComponent = categoryIcons[it.category]
                    return (
                      <div key={it.id} className="border rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-background/20">
                        <div className="h-32 overflow-hidden">
                          <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-4 h-4 text-romantic" />
                              <span className="font-medium text-sm">{it.title}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={()=>removeItem(it.id)}>
                              <Trash2 className="w-4 h-4"/>
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{it.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded text-xs capitalize" style={{ backgroundColor: it.color + '20', color: it.color }}>
                              {it.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const SpinForDesireAdmin = () => {
  return (
    <AdminProtectedRoute>
      <SpinForDesireAdminContent />
    </AdminProtectedRoute>
  )
}

export default SpinForDesireAdmin
