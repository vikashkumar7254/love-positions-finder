import { useEffect, useMemo, useState } from "react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute } from "@/components/AdminAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { romanticGuides, type RomanticGuide, guideCategories } from "@/data/romanticGuides"
import { Plus, Trash2, BookOpen, Star, Palette, Sparkles } from "lucide-react"

const STORAGE_KEY = 'romantic_guides_custom'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

type GuideForm = {
  title: string
  description: string
  category: keyof typeof guideCategories
  difficulty: Difficulty
  duration: string
  icon: string
  color: string
  featured: boolean
}

const presetColors = [
  { label: 'Romantic', value: 'text-romantic' },
  { label: 'Passionate', value: 'text-passionate' },
  { label: 'Sensual', value: 'text-sensual' },
  { label: 'Warm', value: 'text-warm' },
]

const defaultForm: GuideForm = {
  title: '',
  description: '',
  category: 'romantic_connection',
  difficulty: 'beginner',
  duration: 'Ongoing',
  icon: '💝',
  color: 'text-romantic',
  featured: true,
}

const RomanticGuidesAdminContent = () => {
  const [items, setItems] = useState<RomanticGuide[]>([])
  const [form, setForm] = useState<GuideForm>(defaultForm)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const defaultsCount = useMemo(() => romanticGuides.length, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed: RomanticGuide[] = raw ? JSON.parse(raw) : []
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
    document.title = "Romantic Guides Admin | ScratchSexPositions"
  }, [])

  const saveItems = (next: RomanticGuide[]) => {
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const toSlug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const addItem = () => {
    const t = form.title.trim()
    const d = form.description.trim()
    if (!t) { setMessage({type:'error', text:'Title is required'}); setTimeout(()=>setMessage(null),3000); return }
    if (!d) { setMessage({type:'error', text:'Description is required'}); setTimeout(()=>setMessage(null),3000); return }

    const id = toSlug(t) || `guide-${Date.now()}`

    const newGuide: RomanticGuide = {
      id,
      title: t,
      description: d,
      category: form.category,
      difficulty: form.difficulty,
      duration: form.duration,
      icon: form.icon || '💝',
      color: form.color,
      featured: form.featured,
      sections: [
        { id: 'intro', title: 'Introduction', content: 'Overview and purpose of this guide.' },
        { id: 'practice', title: 'Core Practice', content: 'Actionable steps and structure to follow.' },
        { id: 'growth', title: 'Deepening the Practice', content: 'Ways to enhance and personalize this guide.' },
      ],
      tips: [
        'Go at your own pace and be consistent',
        'Communicate openly and kindly',
        'Focus on connection and enjoyment',
      ],
    }

    const next = [...items, newGuide]
    saveItems(next)
    setForm(defaultForm)
    setMessage({type:'success', text:'Guide added! Open Romantic Guides to see it.'})
    setTimeout(()=>setMessage(null), 4000)
  }

  const removeItem = (id: string) => {
    const next = items.filter(i => i.id !== id)
    saveItems(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-romantic to-passionate bg-clip-text text-transparent">Romantic Guides Admin</h1>
            <p className="text-muted-foreground mt-2">Create beautiful, helpful guides. They will appear in Romantic Guides along with defaults.</p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg border ${message.type==='success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Add New Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4"/> Title</label>
                  <Input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="e.g. Daily Romance Rituals" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Category</label>
                  <Select value={form.category} onValueChange={(v:any)=>setForm({...form, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Choose category"/></SelectTrigger>
                    <SelectContent>
                      {Object.entries(guideCategories).map(([key, g]) => (
                        <SelectItem key={key} value={key}>{g.icon} {g.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Difficulty</label>
                  <Select value={form.difficulty} onValueChange={(v:any)=>setForm({...form, difficulty: v})}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Duration</label>
                  <Input value={form.duration} onChange={e=>setForm({...form, duration: e.target.value})} placeholder="e.g. 2-4 weeks practice" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Icon (Emoji)</label>
                  <Input value={form.icon} onChange={e=>setForm({...form, icon: e.target.value})} placeholder="e.g. 💝, 🌸, 🌙" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center gap-2"><Palette className="w-4 h-4"/> Color</label>
                  <Select value={form.color} onValueChange={(v:any)=>setForm({...form, color: v})}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {presetColors.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1">Description</label>
                <Textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Short summary of the guide..." />
                <div className="flex items-center gap-2 mt-2">
                  <input id="featured" type="checkbox" checked={form.featured} onChange={e=>setForm({...form, featured: e.target.checked})} />
                  <label htmlFor="featured" className="text-sm flex items-center gap-1">
                    <Star className="w-3 h-3"/> Featured
                  </label>
                </div>
              </div>

              <Button onClick={addItem} variant="romantic" className="flex items-center gap-2">
                <Plus className="w-4 h-4"/> Add Guide
              </Button>
            </CardContent>
          </Card>

          {/* Current Custom Guides */}
          <Card>
            <CardHeader>
              <CardTitle>Current Custom Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">Defaults: {defaultsCount} • Custom: {items.length} • Total: {defaultsCount + items.length}</div>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No custom guides yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(it => (
                    <div key={it.id} className="border rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-background/20">
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{it.icon}</span>
                            <span className="font-medium text-sm">{it.title}</span>
                          </div>
                          {it.featured && (
                            <span className="inline-flex items-center gap-1 text-xs"><Star className="w-3 h-3"/> Featured</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{it.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="capitalize">{it.difficulty}</span>
                          <span className="opacity-70">{it.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded ${it.color} bg-white/5 text-xs`}>{guideCategories[it.category].title}</span>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={()=>removeItem(it.id)}>
                            <Trash2 className="w-4 h-4"/>
                          </Button>
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

const RomanticGuidesAdmin = () => (
  <AdminProtectedRoute>
    <RomanticGuidesAdminContent />
  </AdminProtectedRoute>
)

export default RomanticGuidesAdmin
