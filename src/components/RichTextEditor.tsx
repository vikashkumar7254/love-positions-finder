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
  Minimize2
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
    }
  }, [onChange, saveToHistory])

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

    // Check file size (max 5MB for blog images)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size too large. Maximum 5MB allowed.')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    // Show loading state
    const loadingImg = `<div class="image-loading" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 10px 0;">
      <div class="loading-spinner" style="width: 20px; height: 20px; border: 2px solid #e5e7eb; border-top: 2px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span style="margin-left: 8px; color: #6b7280;">Uploading image...</span>
    </div>`
    insertText(loadingImg)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" loading="lazy" />`
      // Replace loading div with actual image
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<div class="image-loading"[^>]*>.*?<\/div>/s, img)
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedContent
        updateContent()
      }
    }
    reader.onerror = () => {
      alert('Failed to upload image. Please try again.')
      // Remove loading div on error
      const currentContent = editorRef.current?.innerHTML || ''
      const updatedContent = currentContent.replace(/<div class="image-loading"[^>]*>.*?<\/div>/s, '')
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

    // Check file size (max 10MB for blog videos)
    if (file.size > 10 * 1024 * 1024) {
      alert('Video size too large. Maximum 10MB allowed.')
      return
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const video = `<video controls style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;">
        <source src="${e.target?.result}" type="${file.type}">
        Your browser does not support the video tag.
      </video>`
      insertText(video)
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
        // Replace selected text with link
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">${linkText}</a>`
        insertText(linkHtml)
      } else {
        // Create link with URL as text
        execCommand('createLink', linkUrl)
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
    const img = `<img src="${imageUrl}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />`
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
            <span>{value.replace(/<[^>]*>/g, '').length} characters</span>
            <span>{value.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length} words</span>
            <span>{value.match(/<img/g)?.length || 0} images</span>
            <span>{value.match(/<video/g)?.length || 0} videos</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor
