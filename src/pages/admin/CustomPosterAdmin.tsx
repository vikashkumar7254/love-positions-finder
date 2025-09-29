import { useEffect, useMemo, useState } from "react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { posterPositions, loadCustomPosterPositions, saveCustomPosterPositions, type PosterPosition } from "@/data/posterPositions"
import { Plus, Trash2, Image as ImageIcon, Sparkles, Heart, Zap, Star, Crown } from "lucide-react"

const STORAGE_KEY = 'poster_positions_custom'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

type PositionForm = {
  name: string
  category: string
  difficulty: Difficulty
  image: string
  description: string
}

const defaultForm: PositionForm = {
  name: '',
  category: 'Intimate',
  difficulty: 'beginner',
  image: '',
  description: '',
}

const categoryIcons = {
  'Intimate': Heart,
  'Classic': Star,
  'Gentle': Sparkles,
  'Adventurous': Zap,
  'Romantic': Crown,
  'Playful': Star,
}

const CustomPosterAdminContent = () => {
  const [items, setItems] = useState<PosterPosition[]>([])
  const [form, setForm] = useState<PositionForm>(defaultForm)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const defaultsCount = useMemo(() => posterPositions.length, [])

  useEffect(() => {
    const customItems = loadCustomPosterPositions()
    setItems(customItems)
    document.title = "Custom Poster Admin | ScratchSexPositions"
  }, [])

  const addItem = () => {
    const n = form.name.trim()
    const cat = form.category.trim()
    const img = form.image.trim()
    const desc = form.description.trim()

    // Validation
    if (!n) {
      setMessage({type: 'error', text: 'Please enter a position name'})
      setTimeout(() => setMessage(null), 3000)
      return
    }
    if (!cat) {
      setMessage({type: 'error', text: 'Please enter a category'})
      setTimeout(() => setMessage(null), 3000)
      return
    }
    if (!img) {
      setMessage({type: 'error', text: 'Please enter an image URL'})
      setTimeout(() => setMessage(null), 3000)
      return
    }
    if (!desc) {
      setMessage({type: 'error', text: 'Please enter a description'})
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

    const id = `custom-${Date.now()}`
    const newPosition: PosterPosition = {
      id,
      name: n,
      category: cat,
      difficulty: form.difficulty,
      image: img,
      description: desc,
    }

    const next = [...items, newPosition]
    setItems(next)
    saveCustomPosterPositions(next)
    setForm(defaultForm)
    setMessage({type: 'success', text: 'Position added! It will appear in the Custom Poster game.'})

    // Auto-dismiss success message
    setTimeout(() => setMessage(null), 5000)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    saveCustomPosterPositions(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">Custom Poster Admin</h1>
            <p className="text-muted-foreground mt-2">Add position images, names, categories, and descriptions for the Custom Poster journey game.</p>
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

          {/* Add New Position */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4"/> Position Name</label>
                  <Input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="e.g. Cradle, Butterfly" />
                  <p className="text-xs text-muted-foreground mt-1">Give your position a descriptive name</p>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><Heart className="w-4 h-4"/> Category</label>
                  <Select value={form.category} onValueChange={(v)=>setForm({...form, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Intimate">💝 Intimate</SelectItem>
                      <SelectItem value="Classic">⭐ Classic</SelectItem>
                      <SelectItem value="Gentle">✨ Gentle</SelectItem>
                      <SelectItem value="Adventurous">⚡ Adventurous</SelectItem>
                      <SelectItem value="Romantic">👑 Romantic</SelectItem>
                      <SelectItem value="Playful">🎭 Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Difficulty</label>
                  <Select value={form.difficulty} onValueChange={(v:any)=>setForm({...form, difficulty: v})}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">🟢 Beginner</SelectItem>
                      <SelectItem value="intermediate">🟡 Intermediate</SelectItem>
                      <SelectItem value="advanced">🔴 Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Image Preview</label>
                  <div className="border rounded-lg p-2 h-20 bg-muted flex items-center justify-center">
                    {form.image ? (
                      <img src={form.image} alt="Preview" className="max-h-16 max-w-full object-cover rounded" />
                    ) : (
                      <span className="text-muted-foreground text-sm">No image</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1"><ImageIcon className="w-4 h-4"/> Image URL</label>
                <Input value={form.image} onChange={e=>setForm({...form, image: e.target.value})} placeholder="https://example.com/image.jpg" />
                <p className="text-xs text-muted-foreground mt-1">Must start with http:// or https://</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1">Description</label>
                <Textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Brief description of the position..." />
                <p className="text-xs text-muted-foreground mt-1">Describe the position and its benefits</p>
              </div>

              <Button onClick={addItem} variant="romantic" className="flex items-center gap-2">
                <Plus className="w-4 h-4"/> Add Position
              </Button>
            </CardContent>
          </Card>

          {/* Current Custom Positions */}
          <Card>
            <CardHeader>
              <CardTitle>Current Custom Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">Defaults: {defaultsCount} • Custom: {items.length} • Total: {defaultsCount + items.length}</div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No custom positions yet. Add some above!</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(it => {
                    const IconComponent = categoryIcons[it.category as keyof typeof categoryIcons] || Heart
                    return (
                      <div key={it.id} className="border rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-background/20">
                        <div className="h-32 overflow-hidden">
                          <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-4 h-4 text-romantic" />
                              <span className="font-medium text-sm">{it.name}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={()=>removeItem(it.id)}>
                              <Trash2 className="w-4 h-4"/>
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{it.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded text-xs capitalize" style={{
                              backgroundColor: it.difficulty === 'beginner' ? '#10b98120' : it.difficulty === 'intermediate' ? '#f59e0b20' : '#ef444420',
                              color: it.difficulty === 'beginner' ? '#10b981' : it.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444'
                            }}>
                              {it.difficulty}
                            </span>
                            <span className="px-2 py-1 rounded text-xs bg-romantic/10 text-romantic">
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

const CustomPosterAdmin = () => (
  <AdminProtectedRoute>
    <CustomPosterAdminContent />
  </AdminProtectedRoute>
)

export default CustomPosterAdmin
