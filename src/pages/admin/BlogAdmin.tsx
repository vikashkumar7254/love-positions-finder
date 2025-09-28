import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import { AdminProtectedRoute, useAdminAuth } from "@/components/AdminAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { CheckCircle2, XCircle, Calendar, Clock, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "userBlogs"

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
  approved?: boolean
}

const BlogAdminContent = () => {
  const { logout } = useAdminAuth()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Blog | null>(null)
  const [form, setForm] = useState<Blog | null>(null)

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setBlogs(raw ? JSON.parse(raw) : [])
    } catch {
      setBlogs([])
    }
  }

  useEffect(() => {
    load()
    document.title = "Blog Admin | Approvals"
  }, [])

  const save = (items: Blog[]) => {
    setBlogs(items)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  const approve = (id: string) => {
    const next = blogs.map(b => b.id === id ? { ...b, approved: true } : b)
    save(next)
  }
  const reject = (id: string) => {
    const next = blogs.filter(b => b.id !== id)
    save(next)
  }

  const startEdit = (post: Blog) => {
    setEditing(post)
    setForm({ ...post })
  }
  const cancelEdit = () => { setEditing(null); setForm(null) }
  const applyEdit = () => {
    if (!form) return
    const next = blogs.map(b => b.id === form.id ? { ...b, ...form } : b)
    save(next)
    cancelEdit()
  }

  const filtered = blogs.filter(b =>
    (b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt.toLowerCase().includes(query.toLowerCase()))
  )
  const pending = filtered.filter(b => !b.approved)
  const approved = filtered.filter(b => b.approved)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="container max-w-6xl mx-auto px-4 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Blog Admin</h1>
            <div className="flex items-center gap-3">
              <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search submissions" className="max-w-xs" />
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">Pending Approval ({pending.length})</h2>
            {pending.length === 0 ? (
              <div className="text-sm text-muted-foreground">No pending submissions.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pending.map(p => (
                  <Card key={p.id} className="bg-gradient-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-2">{p.excerpt}</div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
                        <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3" /> {p.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="romantic" onClick={() => approve(p.id)} className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Approve
                        </Button>
                        <Button variant="outline" onClick={() => startEdit(p)} className="inline-flex items-center gap-1">Edit</Button>
                        <Button variant="outline" onClick={() => reject(p.id)} className="inline-flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Approved ({approved.length})</h2>
            {approved.length === 0 ? (
              <div className="text-sm text-muted-foreground">No approved posts yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approved.map(p => (
                  <Card key={p.id} className="bg-gradient-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-2">{p.excerpt}</div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
                        <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3" /> {p.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="romantic" onClick={() => startEdit(p)} className="inline-flex items-center gap-1">Edit</Button>
                        <Button variant="outline" onClick={() => reject(p.id)} className="inline-flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Editor Overlay */}
          {editing && form && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={cancelEdit}>
              <div className="w-full max-w-2xl" onClick={e=>e.stopPropagation()}>
                <Card className="bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs">Title</label>
                        <Input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs">Slug</label>
                        <Input value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs">Date</label>
                        <Input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs">Category</label>
                        <Input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs">Read Time</label>
                        <Input value={form.readTime} onChange={e=>setForm({...form, readTime: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <input id="approved" type="checkbox" checked={!!form.approved} onChange={e=>setForm({...form, approved: e.target.checked})} />
                        <label htmlFor="approved" className="text-sm">Approved</label>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs">Excerpt</label>
                      <Input value={form.excerpt} onChange={e=>setForm({...form, excerpt: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs">Content</label>
                      <textarea className="w-full rounded-md bg-background/60 border p-2 h-48" value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                      <Button variant="romantic" onClick={applyEdit}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const BlogAdmin = () => {
  return (
    <AdminProtectedRoute>
      <BlogAdminContent />
    </AdminProtectedRoute>
  )
}

export default BlogAdmin
