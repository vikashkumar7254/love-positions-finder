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
  List,
  Link,
  ImageIcon,
  Video,
  Code,
  ChevronDown,
  MoreHorizontal,
  Grid
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
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // For content field, position toolbar below the textarea
    if (fieldName === 'content') {
      setToolbarPosition({
        top: rect.bottom + scrollTop + 15,
        left: rect.left
      });
    } else {
      // For other fields, position normally
      setToolbarPosition({
        top: rect.bottom + scrollTop + 10,
        left: rect.left
      });
    }
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

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showListMenu, setShowListMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = () => {
        setShowColorPicker(false);
        setShowListMenu(false);
        setShowMoreMenu(false);
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const applyFormat = (command: string, value?: string) => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        document.execCommand(command, false, value);
        activeElement.focus();
      }
    };

    const colors = [
      '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db',
      '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981',
      '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'
    ];

    return (
      <div
        className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-2xl"
        style={{
          top: `${toolbarPosition.top}px`,
          left: `${toolbarPosition.left}px`,
          minWidth: '400px',
          maxWidth: '600px'
        }}
      >
        {/* Main Toolbar */}
        <div className="flex items-center gap-1 p-2">
          {/* AI Features */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
          </button>

          {/* Paragraph Dropdown */}
          <div className="relative">
            <button
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center gap-1"
              title="Text Style"
            >
              Paragraph <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => applyFormat('bold')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group font-bold"
              title="Bold (Ctrl+B)"
            >
              B
            </button>
            <button
              onClick={() => applyFormat('italic')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group italic"
              title="Italic (Ctrl+I)"
            >
              I
            </button>
            <button
              onClick={() => applyFormat('underline')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group underline"
              title="Underline (Ctrl+U)"
            >
              U
            </button>
          </div>

          {/* Text Color Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group flex items-center gap-1"
              title="Text Color"
            >
              A <ChevronDown className="w-3 h-3" />
            </button>
            {showColorPicker && (
              <div 
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        applyFormat('foreColor', color);
                        setShowColorPicker(false);
                      }}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all duration-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <button className="mt-2 text-xs text-gray-500 hover:text-gray-700">
                  + Custom
                </button>
              </div>
            )}
          </div>

          {/* List Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowListMenu(!showListMenu);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group flex items-center gap-1"
              title="Lists"
            >
              <List className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
            {showListMenu && (
              <div 
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    applyFormat('insertUnorderedList');
                    setShowListMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <div className="w-4 h-4 flex flex-col justify-center">
                    <div className="w-1 h-1 bg-gray-600 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full mb-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  Bullet List
                </button>
                <button
                  onClick={() => {
                    applyFormat('insertOrderedList');
                    setShowListMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <div className="w-4 h-4 flex flex-col justify-center">
                    <div className="text-xs">1.</div>
                    <div className="text-xs">2.</div>
                    <div className="text-xs">3.</div>
                  </div>
                  Numbered List
                </button>
                <button
                  onClick={() => {
                    applyFormat('indent');
                    setShowListMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <div className="w-4 h-4 flex items-center">
                    <div className="w-2 h-0.5 bg-gray-600"></div>
                    <div className="w-1 h-0.5 bg-gray-600 ml-1"></div>
                  </div>
                  Indent
                </button>
              </div>
            )}
          </div>

          {/* Link */}
          <button
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) applyFormat('createLink', url);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </button>

          {/* Image */}
          <button
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) applyFormat('insertImage', url);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Video */}
          <button
            onClick={() => {
              const url = prompt('Enter video URL:');
              if (url) {
                const videoHtml = `<video controls><source src="${url}" type="video/mp4"></video>`;
                applyFormat('insertHTML', videoHtml);
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="Insert Video"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* More Options Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              title="More Options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showMoreMenu && (
              <div 
                className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    applyFormat('justifyLeft');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <AlignLeft className="w-4 h-4" />
                  Align Left
                </button>
                <button
                  onClick={() => {
                    applyFormat('justifyCenter');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <AlignCenter className="w-4 h-4" />
                  Align Center
                </button>
                <button
                  onClick={() => {
                    applyFormat('justifyRight');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <AlignRight className="w-4 h-4" />
                  Align Right
                </button>
                <button
                  onClick={() => {
                    applyFormat('insertTable');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <Grid className="w-4 h-4" />
                  Insert Table
                </button>
                <button
                  onClick={() => {
                    applyFormat('removeFormat');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Formatting
                </button>
              </div>
            )}
          </div>

          {/* Code */}
          <button
            onClick={() => applyFormat('insertHTML', '<code></code>')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            title="Insert Code"
          >
            <Code className="w-4 h-4" />
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
                      style={{
                        direction: 'ltr',
                        textAlign: 'left',
                        unicodeBidi: 'normal'
                      }}
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
                    style={{
                      direction: 'ltr',
                      textAlign: 'left',
                      unicodeBidi: 'normal'
                    }}
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
                <div
                  contentEditable
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                  onFocus={(e) => handleFieldFocus('content', e)}
                  onBlur={handleFieldBlur}
                  className="resize-none min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 content-editable-placeholder"
                  style={{
                    direction: 'ltr',
                    textAlign: 'left',
                    backgroundColor: '#ffffff',
                    color: '#000000'
                  }}
                  data-placeholder="Start writing your amazing blog post here... Use the floating toolbar for formatting! 😍💕❤️"
                  dangerouslySetInnerHTML={{ __html: content || '' }}
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
