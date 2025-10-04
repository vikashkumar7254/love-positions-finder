import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { 
  Calendar, 
  BookOpen, 
  Tag, 
  Type, 
  FileText, 
  Heart, 
  Clock,
  User,
  Hash,
  Target,
  TrendingUp,
  BarChart3,
  Save,
  Eye,
  Settings,
  Sparkles,
  Zap,
  Wand2,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  X,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List
} from "lucide-react";

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
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  
  const slug = useMemo(() => makeSlug(title), [title]);
  const readTime = useMemo(() => estimateReadTime(content), [content]);
  
  // Auto-generate meta title and description
  useEffect(() => {
    if (title && !metaTitle) {
      setMetaTitle(title);
    }
  }, [title, metaTitle]);
  
  useEffect(() => {
    if (excerpt && !metaDescription) {
      setMetaDescription(excerpt);
    }
  }, [excerpt, metaDescription]);

  // Handle field focus for floating toolbar
  const handleFieldFocus = (fieldName: string, event: React.FocusEvent) => {
    setActiveField(fieldName);
    const rect = event.currentTarget.getBoundingClientRect();
    setToolbarPosition({
      top: rect.bottom + 10,
      left: rect.left
    });
  };

  const handleFieldBlur = () => {
    // Delay hiding toolbar to allow clicking on it
    setTimeout(() => {
      setActiveField(null);
    }, 200);
  };

  // Floating Toolbar Component
  const FloatingToolbar = () => {
    if (!activeField) return null;

    const applyFormat = (command: string, value?: string) => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        document.execCommand(command, false, value);
        activeElement.focus();
      }
    };

    return (
      <div
        className="fixed z-50 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-3"
        style={{
          top: toolbarPosition.top,
          left: toolbarPosition.left,
          transform: 'translateY(0px)',
          minWidth: '300px'
        }}
      >
        <div className="flex items-center gap-2">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => applyFormat('bold')}
              className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Bold (Ctrl+B)"
            >
              <Type className="w-4 h-4 group-hover:scale-110" />
            </button>
            <button
              onClick={() => applyFormat('italic')}
              className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Italic (Ctrl+I)"
            >
              <Type className="w-4 h-4 group-hover:scale-110" />
            </button>
            <button
              onClick={() => applyFormat('underline')}
              className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Underline (Ctrl+U)"
            >
              <Type className="w-4 h-4 group-hover:scale-110" />
            </button>
          </div>

          <div className="w-px h-8 bg-gray-300" />

          {/* Lists */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => applyFormat('insertOrderedList')}
              className="p-2 hover:bg-green-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Numbered List"
            >
              <List className="w-4 h-4 group-hover:scale-110" />
            </button>
            <button
              onClick={() => applyFormat('insertUnorderedList')}
              className="p-2 hover:bg-green-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Bullet List"
            >
              <List className="w-4 h-4 group-hover:scale-110" />
            </button>
          </div>

          <div className="w-px h-8 bg-gray-300" />

          {/* Alignment */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => applyFormat('justifyLeft')}
              className="p-2 hover:bg-purple-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4 group-hover:scale-110" />
            </button>
            <button
              onClick={() => applyFormat('justifyCenter')}
              className="p-2 hover:bg-purple-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4 group-hover:scale-110" />
            </button>
            <button
              onClick={() => applyFormat('justifyRight')}
              className="p-2 hover:bg-purple-500 hover:text-white rounded-lg transition-all duration-200 group"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4 group-hover:scale-110" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setActiveField(null)}
            className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 group ml-auto"
            title="Close Toolbar"
          >
            <X className="w-4 h-4 group-hover:scale-110" />
          </button>
        </div>
      </div>
    );
  };

  const onSubmit = async (isDraftSave = false) => {
    if (!title || !excerpt || !content) return;
    
    setIsPublishing(true);

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
          status: isDraftSave ? 'draft' : 'pending',
          metaTitle: String(metaTitle || title || ''),
          metaDescription: String(metaDescription || excerpt || ''),
          metaKeywords: String(metaKeywords || ''),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Create New Blog Post
                </h1>
                <p className="text-sm text-gray-600">Share your thoughts with the world</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSeoPanel(!showSeoPanel)}
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                SEO
              </Button>
              <Button
                variant="outline"
                onClick={() => onSubmit(true)}
                disabled={!title || !content || isPublishing}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button
                variant="hero"
                onClick={() => onSubmit(false)}
                disabled={!title || !excerpt || !content || isPublishing}
                className="flex items-center gap-2"
              >
                {isPublishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Type className="w-4 h-4 text-white" />
                  </div>
                  Blog Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Type className="w-4 h-4 text-blue-500" />
                      Title *
                    </label>
                    <Input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      onFocus={(e) => handleFieldFocus('title', e)}
                      onBlur={handleFieldBlur}
                      placeholder="Enter an amazing title for your blog post..."
                      className="h-12 text-lg font-medium"
                    />
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      Slug: {slug || "(auto-generated)"}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-500" />
                      Category
                    </label>
                    <Input 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      placeholder="Romance, Tips & Advice, Lifestyle..."
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      Publish Date
                    </label>
                    <Input 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-500" />
                      Author Name
                    </label>
                    <Input 
                      value={author} 
                      onChange={(e) => setAuthor(e.target.value)} 
                      placeholder="Your name (optional)"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    Excerpt
                  </label>
                  <Textarea 
                    value={excerpt} 
                    onChange={(e) => setExcerpt(e.target.value)} 
                    onFocus={(e) => handleFieldFocus('excerpt', e)}
                    onBlur={handleFieldBlur}
                    placeholder="Write a compelling summary that will appear on the blog listing page..."
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    {excerpt.length}/200 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor Card */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={content}
                  onChange={(content) => setContent(content)}
                  onFocus={(e) => handleFieldFocus('content', e)}
                  onBlur={handleFieldBlur}
                  placeholder="Start writing your amazing blog post here... Use the toolbar above for formatting! 😍💕❤️"
                />
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">💡 Pro Tips for Better Content:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Use H1, H2, H3 for clear structure and better SEO</li>
                        <li>• Add images and videos to make your post engaging</li>
                        <li>• Use bullet points and lists for easy reading</li>
                        <li>• Include emojis to make it more fun and relatable</li>
                        <li>• Add quotes and code blocks to highlight important points</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-white" />
                  </div>
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length}</div>
                    <div className="text-xs text-gray-600 font-medium">Words</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{content.replace(/<[^>]*>/g, '').length}</div>
                    <div className="text-xs text-gray-600 font-medium">Characters</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{readTime}</div>
                    <div className="text-xs text-gray-600 font-medium">Read Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{(content.match(/<img/g) || []).length}</div>
                    <div className="text-xs text-gray-600 font-medium">Images</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Panel */}
            {showSeoPanel && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    SEO Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
                    <Input 
                      value={metaTitle} 
                      onChange={(e) => setMetaTitle(e.target.value)} 
                      placeholder="SEO title (50-60 characters)"
                      className="h-10"
                    />
                    <p className="text-xs text-gray-500">
                      {metaTitle.length}/60 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
                    <Textarea 
                      value={metaDescription} 
                      onChange={(e) => setMetaDescription(e.target.value)} 
                      placeholder="SEO description (150-160 characters)"
                      rows={3}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500">
                      {metaDescription.length}/160 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Keywords</label>
                    <Input 
                      value={metaKeywords} 
                      onChange={(e) => setMetaKeywords(e.target.value)} 
                      placeholder="keyword1, keyword2, keyword3"
                      className="h-10"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowSeoPanel(!showSeoPanel)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showSeoPanel ? 'Hide SEO' : 'Show SEO'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/blog')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Blogs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating Toolbar */}
      <FloatingToolbar />
    </div>
  );
};

const ClockIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

export default AddBlog;
