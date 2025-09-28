import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Image as ImageIcon, Type } from "lucide-react"
import { scratchPositions } from "@/data/scratchPositions"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"

const STORAGE_KEY = 'scratch_positions_custom'

type CustomItem = {
  id: string
  title: string
  image: string
}

const ScratchPositionsAdminContent = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [items, setItems] = useState<CustomItem[]>([])

  const defaultsCount = useMemo(()=> scratchPositions.length, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: CustomItem[] = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
    document.title = "Scratch Positions Admin | ScratchSexPositions"
  }, [])

  const saveItems = (next: CustomItem[]) => {
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const toSlug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const addItem = () => {
    const t = title.trim()
    const img = image.trim()
    if (!t || !img) return
    const id = toSlug(t) || `item-${Date.now()}`
    const next = [...items, { id, title: t, image: img }]
    saveItems(next)
    setTitle("")
    setImage("")
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    saveItems(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">Scratch Positions Admin</h1>
            <p className="text-muted-foreground mt-2">Add position name and image URL. These will appear in Scratch Positions along with defaults.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add New Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><Type className="w-4 h-4"/> Title</label>
                  <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Romantic Lift" />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1"><ImageIcon className="w-4 h-4"/> Image URL</label>
                  <Input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://... or /assets/..." />
                </div>
              </div>
              <Button onClick={addItem} variant="romantic" className="flex items-center gap-2"><Plus className="w-4 h-4"/> Add</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Custom Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">Defaults: {defaultsCount} • Custom: {items.length} • Total: {defaultsCount + items.length}</div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No custom items yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(it => (
                    <div key={it.id} className="border rounded-lg overflow-hidden">
                      <div className="h-40 bg-muted overflow-hidden">
                        <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div className="font-medium">{it.title}</div>
                        <Button variant="outline" size="sm" onClick={()=>removeItem(it.id)}><Trash2 className="w-4 h-4"/></Button>
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

const ScratchPositionsAdmin = () => {
  return (
    <AdminProtectedRoute>
      <ScratchPositionsAdminContent />
    </AdminProtectedRoute>
  )
}

export default ScratchPositionsAdmin
