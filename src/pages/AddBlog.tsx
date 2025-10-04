import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { Calendar, BookOpen, Tag, Type, FileText, Heart } from "lucide-react";

interface UserBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  category: string;
  content: string; // HTML-ish or plain
  approved?: boolean; // requires admin approval to be visible
}

const STORAGE_KEY = "userBlogs";

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState("");
  const slug = useMemo(() => makeSlug(title), [title]);
  const readTime = useMemo(() => estimateReadTime(content), [content]);

  const onSubmit = async () => {
    if (!title || !excerpt || !content) return;

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: String(title || ''),
          excerpt: String(excerpt || ''),
          content: String(content || ''),
          author: String(author || 'Guest Author'),
          authorImage: '',
          featuredImage: '',
          category: String(category || 'General'),
          tags: [],
          status: 'pending',
          metaTitle: String(title || ''),
          metaDescription: String(excerpt || ''),
          metaKeywords: '',
          featured: false
        })
      })

      if (res.ok) {
        alert('✅ Blog submitted successfully! Your article is pending admin approval and will be visible on the blog once approved.');
        navigate('/blog');
        return;
      }

      // Fallback to localStorage (dev only)
      const readTime = estimateReadTime(content);
      const post: UserBlogPost = {
        id: `${Date.now()}`,
        title,
        slug: slug || `${Date.now()}`,
        excerpt,
        date,
        readTime,
        category: category || 'General',
        content,
        approved: false,
      };
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: UserBlogPost[] = existingRaw ? JSON.parse(existingRaw) : [];
      const filtered = existing.filter((p) => p.slug !== post.slug);
      const next = [post, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      
      alert('✅ Blog submitted successfully! Your article is pending admin approval and will be visible on the blog once approved.');
      navigate('/blog');
    } catch {
      // Fallback to localStorage on error
      const readTime = estimateReadTime(content);
      const post: UserBlogPost = {
        id: `${Date.now()}`,
        title,
        slug: slug || `${Date.now()}`,
        excerpt,
        date,
        readTime,
        category: category || 'General',
        content,
        approved: false,
      };
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: UserBlogPost[] = existingRaw ? JSON.parse(existingRaw) : [];
      const filtered = existing.filter((p) => p.slug !== post.slug);
      const next = [post, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      
      alert('✅ Blog submitted successfully! Your article is pending admin approval and will be visible on the blog once approved.');
      navigate('/blog');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Add New Blog
            </h1>
            <p className="text-gray-600 mt-2">
              Create and submit your article. It will be visible on the blog after admin approval.
            </p>
          </div>

          <Card className="border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BookOpen className="w-5 h-5 text-rose-500" />
                Blog Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Title
                  </label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Amazing ideas for couples" />
                  <p className="text-xs text-muted-foreground mt-1">Slug: {slug || "(auto)"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Category
                  </label>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Romance, Tips & Advice..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Author Name
                  </label>
                  <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name (optional)" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <ClockIcon /> Estimated Read Time
                  </label>
                  <Input value={readTime} readOnly />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary for the card..." rows={3} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Content
                </label>
                <RichTextEditor
                  value={content}
                  onChange={(content) => setContent(content)}
                  placeholder="Write your article here... Use the toolbar above for formatting! 😍💕❤️"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 <strong>Rich Text Editor:</strong> Use H1, H2, H3 for headers • Bold, Italic, Underline • Lists • Images, Videos, GIFs • Emojis • Links • Quotes • Code blocks
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => navigate('/blog')}>Cancel</Button>
                <Button variant="hero" onClick={onSubmit} disabled={!title || !excerpt || !content}>
                  <Heart className="w-4 h-4" />
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

const ClockIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

export default AddBlog;
