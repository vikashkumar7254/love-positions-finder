import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/enhanced-button'
import { Card, CardContent } from '@/components/ui/enhanced-card'
import { Input } from '@/components/ui/input'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image as ImageIcon, 
  Video, 
  Smile, 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Code,
  Palette,
  Upload,
  X,
  Eye,
  Save,
  Search,
  Highlighter,
  Strikethrough,
  Subscript,
  Superscript,
  AlignJustify,
  MoreHorizontal,
  Check,
  ExternalLink,
  Copy,
  Undo,
  Redo,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  BookOpen,
  Clock,
  Target,
  Zap,
  FileText,
  Settings,
  Download,
  Upload as UploadIcon,
  History,
  Star,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Wand2,
  Brain,
  Sparkles,
  TrendingUp,
  BarChart3,
  Globe,
  Hash,
  Tag,
  Calendar,
  Timer,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Plus,
  Minus,
  Edit3,
  Trash2,
  Archive,
  Bookmark,
  Share2,
  Lock,
  Unlock,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List as ListIcon,
  Layout,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh
} from 'lucide-react'
import '../styles/rich-text-editor.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showVideoUpload, setShowVideoUpload] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showGoogleSearch, setShowGoogleSearch] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [highlightColor, setHighlightColor] = useState('#ffff00')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // New advanced features state
  const [isVoiceTyping, setIsVoiceTyping] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(true)
  const [autoCompleteEnabled, setAutoCompleteEnabled] = useState(true)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSnippets, setShowSnippets] = useState(false)
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [metaDescription, setMetaDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([])
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false)
  const [showVoiceCommands, setShowVoiceCommands] = useState(false)
  const [voiceCommands, setVoiceCommands] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showDraftManager, setShowDraftManager] = useState(false)
  const [drafts, setDrafts] = useState<any[]>([])
  const [currentDraft, setCurrentDraft] = useState<any>(null)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [versions, setVersions] = useState<any[]>([])
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [collaborators, setCollaborators] = useState<any[]>([])
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [snippets, setSnippets] = useState<any[]>([])
  const [quickActions, setQuickActions] = useState<any[]>([])
  const [showBulkOperations, setShowBulkOperations] = useState(false)
  const [bulkOperations, setBulkOperations] = useState<any[]>([])
  const [showAutoFormat, setShowAutoFormat] = useState(false)
  const [autoFormatEnabled, setAutoFormatEnabled] = useState(true)
  const [showSmartQuotes, setShowSmartQuotes] = useState(false)
  const [smartQuotesEnabled, setSmartQuotesEnabled] = useState(true)
  const [showAutoCapitalization, setShowAutoCapitalization] = useState(false)
  const [autoCapitalizationEnabled, setAutoCapitalizationEnabled] = useState(true)

  // Emoji picker data
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '💕', '💖', '💗', '💘', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💞', '💓', '💟', '💝', '💘', '💖',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💤', '💨', '💫',
    '✨', '🌟', '💫', '⭐', '🌠', '💥', '🔥', '💯', '💢', '💫', '💦', '💨', '🕳️', '💣', '💤', '💨', '💫', '✨', '🌟', '💫'
  ]

  // History management
  const saveToHistory = useCallback((content: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(content)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  // Advanced typing assistance functions
  const calculateWordCount = useCallback((text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim()
    const words = cleanText.split(/\s+/).filter(word => word.length > 0)
    return words.length
  }, [])

  const calculateCharCount = useCallback((text: string) => {
    return text.replace(/<[^>]*>/g, '').length
  }, [])

  const calculateReadingTime = useCallback((wordCount: number) => {
    const wordsPerMinute = 200
    return Math.ceil(wordCount / wordsPerMinute)
  }, [])

  const calculateReadabilityScore = useCallback((text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim()
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = cleanText.split(/\s+/).filter(w => w.length > 0)
    const syllables = cleanText.toLowerCase().replace(/[^a-z]/g, '').length * 0.5
    
    if (sentences.length === 0 || words.length === 0) return 0
    
    const avgWordsPerSentence = words.length / sentences.length
    const avgSyllablesPerWord = syllables / words.length
    
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    return Math.max(0, Math.min(100, Math.round(score)))
  }, [])

  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (value && value.trim()) {
      setIsAutoSaving(true)
      // Simulate auto-save
      setTimeout(() => {
        setLastSaved(new Date())
        setIsAutoSaving(false)
      }, 1000)
    }
  }, [value])

  // Voice typing functionality
  const startVoiceTyping = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsListening(true)
        setIsVoiceTyping(true)
      }
      
      recognition.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        
        if (finalTranscript) {
          insertText(finalTranscript + ' ')
        }
      }
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        setIsVoiceTyping(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
        setIsVoiceTyping(false)
      }
      
      recognition.start()
      setRecognition(recognition)
    } else {
      alert('Voice typing is not supported in this browser')
    }
  }, [])

  const stopVoiceTyping = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setRecognition(null)
    }
    setIsListening(false)
    setIsVoiceTyping(false)
  }, [recognition])

  // SEO suggestions
  const generateKeywordSuggestions = useCallback(async (text: string) => {
    setIsGeneratingSuggestions(true)
    // Simulate keyword generation
    setTimeout(() => {
      const words = text.toLowerCase().match(/\b\w+\b/g) || []
      const wordFreq: Record<string, number> = {}
      
      words.forEach((word: string) => {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      })
      
      const suggestions = Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word)
      
      setSuggestedKeywords(suggestions)
      setIsGeneratingSuggestions(false)
    }, 1000)
  }, [])

  // Template management
  const loadTemplates = useCallback(() => {
    const defaultTemplates = [
      { id: 1, name: 'Blog Post', content: '<h1>Title</h1><p>Introduction...</p><h2>Main Content</h2><p>Content...</p><h2>Conclusion</h2><p>Summary...</p>' },
      { id: 2, name: 'News Article', content: '<h1>Breaking News</h1><p><strong>Date:</strong> Today</p><p>Article content...</p>' },
      { id: 3, name: 'Review', content: '<h1>Product Review</h1><h2>Overview</h2><p>Review content...</p><h2>Pros</h2><ul><li>Point 1</li></ul><h2>Cons</h2><ul><li>Point 1</li></ul>' },
      { id: 4, name: 'Tutorial', content: '<h1>How to...</h1><h2>Step 1</h2><p>Instructions...</p><h2>Step 2</h2><p>Instructions...</p>' },
      { id: 5, name: 'List Post', content: '<h1>Top 10...</h1><ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>' }
    ]
    setTemplates(defaultTemplates)
  }, [])

  // Snippet management
  const loadSnippets = useCallback(() => {
    const defaultSnippets = [
      { id: 1, name: 'Call to Action', content: '<div style="background: #f0f8ff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3>Ready to get started?</h3><p>Take action now!</p></div>' },
      { id: 2, name: 'Quote Box', content: '<blockquote style="border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; background: #f8fafc; font-style: italic;">"Your quote here"</blockquote>' },
      { id: 3, name: 'Info Box', content: '<div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0;"><strong>💡 Tip:</strong> Your tip content here</div>' },
      { id: 4, name: 'Warning Box', content: '<div style="background: #fee2e2; border: 1px solid #ef4444; padding: 15px; border-radius: 6px; margin: 15px 0;"><strong>⚠️ Warning:</strong> Your warning content here</div>' },
      { id: 5, name: 'Code Block', content: '<pre style="background: #1f2937; color: #f9fafb; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>// Your code here</code></pre>' }
    ]
    setSnippets(defaultSnippets)
  }, [])

  // Quick actions
  const loadQuickActions = useCallback(() => {
    const defaultActions = [
      { id: 1, name: 'Insert Table', action: () => insertTable() },
      { id: 2, name: 'Insert Divider', action: () => insertDivider() },
      { id: 3, name: 'Insert Button', action: () => insertButton() },
      { id: 4, name: 'Insert Card', action: () => insertCard() },
      { id: 5, name: 'Insert Badge', action: () => insertBadge() }
    ]
    setQuickActions(defaultActions)
  }, [])

  // Helper functions for quick actions
  const insertTable = () => {
    const table = `<table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <thead>
        <tr style="background: #f8fafc;">
          <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left;">Header 1</th>
          <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left;">Header 2</th>
          <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left;">Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 1, Cell 1</td>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 1, Cell 2</td>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 1, Cell 3</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 2, Cell 1</td>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 2, Cell 2</td>
          <td style="border: 1px solid #e2e8f0; padding: 12px;">Row 2, Cell 3</td>
        </tr>
      </tbody>
    </table>`
    insertText(table)
  }

  const insertDivider = () => {
    insertText('<hr style="border: none; height: 2px; background: linear-gradient(to right, #3b82f6, #8b5cf6); margin: 30px 0;" />')
  }

  const insertButton = () => {
    const button = `<div style="text-align: center; margin: 20px 0;">
      <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Click Me</a>
    </div>`
    insertText(button)
  }

  const insertCard = () => {
    const card = `<div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h3 style="margin: 0 0 10px 0; color: #1f2937;">Card Title</h3>
      <p style="margin: 0; color: #6b7280;">Card content goes here...</p>
    </div>`
    insertText(card)
  }

  const insertBadge = () => {
    const badge = `<span style="display: inline-block; background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin: 0 4px;">Badge</span>`
    insertText(badge)
  }

  // Formatting functions
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateContent()
  }

  const updateContent = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
      saveToHistory(content)
      updateActiveFormats()
      
      // Update stats
      const cleanText = content.replace(/<[^>]*>/g, '')
      const words = calculateWordCount(cleanText)
      const chars = calculateCharCount(cleanText)
      const readingTime = calculateReadingTime(words)
      const readability = calculateReadabilityScore(cleanText)
      
      setWordCount(words)
      setCharCount(chars)
      setReadingTime(readingTime)
      setReadabilityScore(readability)
      
      // Auto-save
      autoSave()
      
      // Generate keyword suggestions
      if (cleanText.length > 50) {
        generateKeywordSuggestions(cleanText)
      }
    }
  }, [onChange, saveToHistory, calculateWordCount, calculateCharCount, calculateReadingTime, calculateReadabilityScore, autoSave, generateKeywordSuggestions])

  // Update active format states
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return
    
    const formats = new Set<string>()
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')
    if (document.queryCommandState('strikeThrough')) formats.add('strikethrough')
    if (document.queryCommandState('subscript')) formats.add('subscript')
    if (document.queryCommandState('superscript')) formats.add('superscript')
    
    setActiveFormats(formats)
  }, [])

  // Undo/Redo functionality
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex]
        onChange(history[newIndex])
      }
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex]
        onChange(history[newIndex])
      }
    }
  }

  const insertText = (text: string) => {
    document.execCommand('insertText', false, text)
    updateContent()
  }

  const insertEmoji = (emoji: string) => {
    insertText(emoji)
    setShowEmojiPicker(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 10MB for blog images)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size too large. Maximum 10MB allowed.')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    // Show loading state
    const loadingImg = `<figure class="image-loading" style="display: flex; align-items: center; justify-content: center; padding: 40px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; margin: 20px 0; border: 2px dashed #cbd5e1;">
      <div class="loading-spinner" style="width: 24px; height: 24px; border: 3px solid #e5e7eb; border-top: 3px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span style="margin-left: 12px; color: #6b7280; font-weight: 500;">Uploading image...</span>
    </figure>`
    insertText(loadingImg)

    const reader = new FileReader()
    reader.onload = (e) => {
      const isGif = file.type === 'image/gif' || file.name.toLowerCase().includes('.gif')
      const img = `<figure style="margin: 2rem 0; text-align: center;">
        <img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" loading="lazy" />
        <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280; font-style: italic;">${isGif ? 'Animated GIF' : 'Image'}</figcaption>
      </figure>`
      
      // Replace loading div with actual image
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<figure class="image-loading"[^>]*>.*?<\/figure>/s, img)
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedContent
        updateContent()
      }
    }
    reader.onerror = () => {
      alert('Failed to upload image. Please try again.')
      // Remove loading div on error
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<figure class="image-loading"[^>]*>.*?<\/figure>/s, '')
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedContent
        updateContent()
      }
    }
    reader.readAsDataURL(file)
    setShowImageUpload(false)
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 50MB for blog videos)
    if (file.size > 50 * 1024 * 1024) {
      alert('Video size too large. Maximum 50MB allowed.')
      return
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file.')
      return
    }

    // Show loading state
    const loadingVideo = `<figure class="video-loading" style="display: flex; align-items: center; justify-content: center; padding: 40px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; margin: 20px 0; border: 2px dashed #cbd5e1;">
      <div class="loading-spinner" style="width: 24px; height: 24px; border: 3px solid #e5e7eb; border-top: 3px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span style="margin-left: 12px; color: #6b7280; font-weight: 500;">Uploading video...</span>
    </figure>`
    insertText(loadingVideo)

    const reader = new FileReader()
    reader.onload = (e) => {
      const video = `<figure style="margin: 2rem 0; text-align: center;">
        <video controls style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); background: #000; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
          <source src="${e.target?.result}" type="${file.type}">
          Your browser does not support the video tag.
        </video>
        <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280; font-style: italic;">Video: ${file.name}</figcaption>
      </figure>`
      
      // Replace loading div with actual video
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<figure class="video-loading"[^>]*>.*?<\/figure>/s, video)
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedContent
        updateContent()
      }
    }
    reader.onerror = () => {
      alert('Failed to upload video. Please try again.')
      // Remove loading div on error
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<figure class="video-loading"[^>]*>.*?<\/figure>/s, '')
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedContent
        updateContent()
      }
    }
    reader.readAsDataURL(file)
    setShowVideoUpload(false)
  }

  // Enhanced link creation
  const insertLink = () => {
    const selection = window.getSelection()
    const selectedText = selection?.toString() || ''
    setLinkText(selectedText)
    setShowLinkDialog(true)
  }

  const createLink = () => {
    if (linkUrl) {
      if (linkText) {
        // Replace selected text with enhanced link
        const isExternal = linkUrl.startsWith('http') && !linkUrl.includes(window.location.hostname)
        const linkHtml = `<a href="${linkUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: #3b82f6; text-decoration: none; background: linear-gradient(120deg, transparent 0%, transparent 100%); background-size: 100% 2px; background-position: 0 100%; background-repeat: no-repeat; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; padding: 2px 4px; border-radius: 4px; font-weight: 500;">${linkText}</a>`
        insertText(linkHtml)
      } else {
        // Create link with URL as text
        const isExternal = linkUrl.startsWith('http') && !linkUrl.includes(window.location.hostname)
        const linkHtml = `<a href="${linkUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: #3b82f6; text-decoration: none; background: linear-gradient(120deg, transparent 0%, transparent 100%); background-size: 100% 2px; background-position: 0 100%; background-repeat: no-repeat; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; padding: 2px 4px; border-radius: 4px; font-weight: 500;">${linkUrl}</a>`
        insertText(linkHtml)
      }
      setShowLinkDialog(false)
      setLinkUrl('')
      setLinkText('')
    }
  }

  // Text highlighting
  const highlightText = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement('span')
      span.style.backgroundColor = highlightColor
      span.className = 'highlight'
      try {
        range.surroundContents(span)
        updateContent()
      } catch (e) {
        // If surroundContents fails, try a different approach
        const contents = range.extractContents()
        span.appendChild(contents)
        range.insertNode(span)
        updateContent()
      }
    }
  }

  // Google Search integration with better error handling
  const searchGoogle = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchResults([])
    
    try {
      // Using Unsplash API as a more reliable alternative to Google Images
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=12&client_id=YOUR_UNSPLASH_ACCESS_KEY`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      const results = data.results?.map((photo: any) => ({
        url: photo.urls.small,
        alt: photo.alt_description || photo.description || 'Search result image',
        title: photo.description || 'Search result',
        fullUrl: photo.urls.full,
        downloadUrl: photo.links.download
      })) || []
      
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to a simple placeholder
      setSearchResults([{
        url: 'https://via.placeholder.com/300x200?text=Search+Failed',
        alt: 'Search failed - please try again',
        title: 'Search Error'
      }])
    } finally {
      setIsSearching(false)
    }
  }

  // Alternative search using Pexels API (more reliable)
  const searchPexels = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchResults([])
    
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=12`, {
        headers: {
          'Authorization': 'YOUR_PEXELS_API_KEY'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      const results = data.photos?.map((photo: any) => ({
        url: photo.src.medium,
        alt: photo.alt || 'Search result image',
        title: photo.photographer || 'Search result',
        fullUrl: photo.src.large,
        photographer: photo.photographer
      })) || []
      
      setSearchResults(results)
    } catch (error) {
      console.error('Pexels search failed:', error)
      // Fallback to placeholder
      setSearchResults([{
        url: 'https://via.placeholder.com/300x200?text=Search+Unavailable',
        alt: 'Search service unavailable',
        title: 'Service Error'
      }])
    } finally {
      setIsSearching(false)
    }
  }

  const insertSearchImage = (imageUrl: string, alt: string) => {
    const isGif = imageUrl.toLowerCase().includes('.gif')
    const img = `<figure style="margin: 2rem 0; text-align: center;">
      <img src="${imageUrl}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" loading="lazy" />
      <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280; font-style: italic;">${isGif ? 'Animated GIF' : 'Image'}: ${alt}</figcaption>
    </figure>`
    insertText(img)
    setShowGoogleSearch(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const insertCode = () => {
    const code = prompt('Enter code:')
    if (code) {
      insertText(`<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-family: monospace;">${code}</code>`)
    }
  }

  const insertQuote = () => {
    insertText('<blockquote style="border-left: 4px solid #ddd; margin: 10px 0; padding: 10px 20px; background: #f9f9f9; font-style: italic;">Quote text here...</blockquote>')
  }

  const insertHeader = (level: number) => {
    const text = prompt(`Enter H${level} text:`)
    if (text) {
      insertText(`<h${level} style="margin: 20px 0 10px 0; font-weight: bold; color: #333;">${text}</h${level}>`)
    }
  }

  const insertList = (ordered: boolean = false) => {
    const listType = ordered ? 'ol' : 'ul'
    insertText(`<${listType} style="margin: 10px 0; padding-left: 20px;">
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</${listType}>`)
  }

  const togglePreview = () => {
    setIsPreview(!isPreview)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault()
            execCommand('bold')
            break
          case 'i':
            e.preventDefault()
            execCommand('italic')
            break
          case 'u':
            e.preventDefault()
            execCommand('underline')
            break
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case 'y':
            e.preventDefault()
            redo()
            break
          case 'k':
            e.preventDefault()
            insertLink()
            break
          case 's':
            e.preventDefault()
            // Save functionality can be added here
            break
        }
      }
    }

    if (editorRef.current) {
      editorRef.current.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [historyIndex, history.length])

  // Initialize history with current content
  useEffect(() => {
    if (value && history.length === 0) {
      setHistory([value])
      setHistoryIndex(0)
    }
  }, [value, history.length])

  // Load templates and snippets on mount
  useEffect(() => {
    loadTemplates()
    loadSnippets()
    loadQuickActions()
  }, [loadTemplates, loadSnippets, loadQuickActions])

  // Auto-save effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (value && value.trim()) {
        autoSave()
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(interval)
  }, [value, autoSave])

  // Voice typing cleanup
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [recognition])

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''} ${className}`}>
      {/* Enhanced Toolbar */}
      <div className="rich-text-toolbar mb-4">
        {/* Undo/Redo */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Typing */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={isVoiceTyping ? "default" : "outline"}
            size="sm"
            onClick={isVoiceTyping ? stopVoiceTyping : startVoiceTyping}
            title={isVoiceTyping ? "Stop Voice Typing" : "Start Voice Typing"}
          >
            {isVoiceTyping ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          {isListening && (
            <div className="status-indicator listening">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Listening...</span>
            </div>
          )}
        </div>

        {/* Auto-save indicator */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          {isAutoSaving ? (
            <div className="status-indicator saving">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span>Saving...</span>
            </div>
          ) : lastSaved ? (
            <div className="status-indicator saved">
              <CheckCircle className="w-3 h-3" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          ) : null}
        </div>

        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={activeFormats.has('bold') ? "default" : "outline"}
            size="sm"
            onClick={() => execCommand('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={activeFormats.has('italic') ? "default" : "outline"}
            size="sm"
            onClick={() => execCommand('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={activeFormats.has('underline') ? "default" : "outline"}
            size="sm"
            onClick={() => execCommand('underline')}
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            variant={activeFormats.has('strikethrough') ? "default" : "outline"}
            size="sm"
            onClick={() => execCommand('strikeThrough')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        {/* Headers */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertHeader(1)}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertHeader(2)}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertHeader(3)}
            title="Heading 3"
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertList(false)}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertList(true)}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => execCommand('justifyFull')}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>

        {/* Text Effects */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={highlightText}
            title="Highlight Text"
          >
            <Highlighter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </Button>
        </div>

        {/* Media & Links */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImageUpload(true)}
            title="Upload Image"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVideoUpload(true)}
            title="Upload Video"
          >
            <Video className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGoogleSearch(true)}
            title="Search Images"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={insertLink}
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>

        {/* Special Elements */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={insertQuote}
            title="Insert Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={insertCode}
            title="Insert Code"
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Insert Emoji"
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        {/* Productivity Tools */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
            title="Templates"
          >
            <FileText className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSnippets(!showSnippets)}
            title="Snippets"
          >
            <Zap className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQuickActions(!showQuickActions)}
            title="Quick Actions"
          >
            <Wand2 className="w-4 h-4" />
          </Button>
        </div>

        {/* SEO Tools */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSeoPanel(!showSeoPanel)}
            title="SEO Tools"
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            title="Content Stats"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Settings */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDraftManager(!showDraftManager)}
            title="Draft Manager"
          >
            <Archive className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVersionHistory(!showVersionHistory)}
            title="Version History"
          >
            <History className="w-4 h-4" />
          </Button>
        </div>

        {/* View Controls */}
        <div className="flex gap-1">
          <Button
            variant={isPreview ? "default" : "outline"}
            size="sm"
            onClick={togglePreview}
            title="Toggle Preview"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="color-picker-panel">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">Highlight Color:</label>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="w-8 h-8 rounded border"
            />
          </div>
          <div className="flex gap-2">
            {['#ffff00', '#ffeb3b', '#4caf50', '#2196f3', '#f44336', '#ff9800', '#9c27b0'].map(color => (
              <button
                key={color}
                className="w-6 h-6 rounded border-2 border-gray-300"
                style={{ backgroundColor: color }}
                onClick={() => setHighlightColor(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="relative">
        {isPreview ? (
          <Card>
            <CardContent className="p-6">
              <div 
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </CardContent>
          </Card>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            className="rich-text-editor"
            onInput={updateContent}
            dangerouslySetInnerHTML={{ __html: value }}
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">Choose Emoji</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmojiPicker(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="emoji-grid">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="emoji-button"
                onClick={() => insertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Backdrop for modals */}
      {(showEmojiPicker || showImageUpload || showVideoUpload || showLinkDialog || showGoogleSearch) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={() => {
            setShowEmojiPicker(false)
            setShowImageUpload(false)
            setShowVideoUpload(false)
            setShowLinkDialog(false)
            setShowGoogleSearch(false)
          }}
        />
      )}

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="media-upload-modal">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upload Image</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImageUpload(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-2">
            Max 5MB • JPG, PNG, GIF supported
          </p>
        </div>
      )}

      {/* Video Upload Modal */}
      {showVideoUpload && (
        <div className="media-upload-modal">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upload Video</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVideoUpload(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-2">
            Max 10MB • MP4, WebM supported
          </p>
        </div>
      )}

      {/* Link Creation Dialog */}
      {showLinkDialog && (
        <div className="media-upload-modal">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Create Link</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLinkDialog(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Link Text</label>
              <Input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={createLink} disabled={!linkUrl}>
                <Check className="w-4 h-4 mr-1" />
                Create Link
              </Button>
              <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Google Search Modal */}
      {showGoogleSearch && (
        <div className="google-search-modal">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Search Images</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGoogleSearch(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for images..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && searchGoogle()}
              />
              <Button onClick={searchGoogle} disabled={!searchQuery.trim() || isSearching}>
                <Search className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={searchPexels} 
                disabled={!searchQuery.trim() || isSearching}
                title="Search Pexels"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
            
            {isSearching && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Searching...</p>
              </div>
            )}
            
            {searchResults.length > 0 && (
              <div className="search-results">
                <h4 className="font-medium mb-2">Search Results:</h4>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer border rounded overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => insertSearchImage(result.url, result.alt)}
                    >
                      <img
                        src={result.url}
                        alt={result.alt}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Stats */}
      <div className="editor-stats">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-4">
            <span>{charCount} characters</span>
            <span>{wordCount} words</span>
            <span>{readingTime} min read</span>
            <span>{value.match(/<img/g)?.length || 0} images</span>
            <span>{value.match(/<video/g)?.length || 0} videos</span>
            <span className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              {readabilityScore}/100
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs">
              {isPreview ? 'Preview Mode' : 'Edit Mode'}
            </span>
            {isFullscreen && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Fullscreen
              </span>
            )}
            {isVoiceTyping && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                Voice Typing
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Templates Panel */}
      {showTemplates && (
        <div className="templates-panel">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">Templates</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplates(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-3 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  insertText(template.content)
                  setShowTemplates(false)
                }}
              >
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {template.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Snippets Panel */}
      {showSnippets && (
        <div className="snippets-panel">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">Snippets</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSnippets(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="p-3 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  insertText(snippet.content)
                  setShowSnippets(false)
                }}
              >
                <h4 className="font-medium">{snippet.name}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {snippet.content.replace(/<[^>]*>/g, '').substring(0, 50)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="quick-actions-panel">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">Quick Actions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuickActions(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  action.action()
                  setShowQuickActions(false)
                }}
                className="justify-start"
              >
                {action.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* SEO Panel */}
      {showSeoPanel && (
        <div className="seo-panel">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">SEO Tools</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSeoPanel(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4 p-3">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <Input
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter meta description..."
                maxLength={160}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                {metaDescription.length}/160 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords (comma separated)..."
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Suggested Keywords</label>
              <div className="flex flex-wrap gap-1">
                {suggestedKeywords.map((keyword, index) => (
                  <button
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200"
                    onClick={() => {
                      const currentKeywords = keywords ? keywords.split(',').map(k => k.trim()) : []
                      if (!currentKeywords.includes(keyword)) {
                        setKeywords([...currentKeywords, keyword].join(', '))
                      }
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
              {isGeneratingSuggestions && (
                <p className="text-xs text-gray-500 mt-1">Generating suggestions...</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span className="text-sm">Readability Score: {readabilityScore}/100</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                readabilityScore >= 80 ? 'bg-green-500' :
                readabilityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel">
          <div className="flex items-center justify-between mb-3 p-3">
            <h3 className="font-semibold">Content Statistics</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{wordCount}</div>
              <div className="text-sm text-gray-500">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{charCount}</div>
              <div className="text-sm text-gray-500">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{readingTime}</div>
              <div className="text-sm text-gray-500">Min Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{readabilityScore}</div>
              <div className="text-sm text-gray-500">Readability</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
