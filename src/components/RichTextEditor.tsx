import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import EmojiToolbar from './EmojiToolbar'
import '@/styles/rich-text-editor.css'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image as ImageIcon,
  Smile,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Strikethrough,
  Highlighter,
  Table,
  Video,
  FileText,
  Palette,
  Undo,
  Redo,
  MoreHorizontal,
  Minus,
  Plus,
  Hash,
  AtSign,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  Upload,
  Copy,
  Scissors,
  Save,
  Eye,
  EyeOff,
  X
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your blog post...",
  className = ""
}: RichTextEditorProps) {
  const [showEmojiToolbar, setShowEmojiToolbar] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newValue = value.substring(0, start) + text + value.substring(end)
    
    onChange(newValue)
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const wrapText = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText) {
      const newText = `${prefix}${selectedText}${suffix}`
      const newValue = value.substring(0, start) + newText + value.substring(end)
      onChange(newValue)
      
      // Select the wrapped text
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length)
      }, 0)
    } else {
      insertText(`${prefix}${suffix}`)
    }
  }

  const insertHeading = (level: number) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText) {
      const newText = `${'#'.repeat(level)} ${selectedText}`
      const newValue = value.substring(0, start) + newText + value.substring(end)
      onChange(newValue)
    } else {
      insertText(`${'#'.repeat(level)} `)
    }
  }

  const insertList = (ordered: boolean = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText) {
      const lines = selectedText.split('\n')
      const listItems = lines.map(line => 
        line.trim() ? `${ordered ? '1.' : '-'} ${line.trim()}` : line
      ).join('\n')
      
      const newValue = value.substring(0, start) + listItems + value.substring(end)
      onChange(newValue)
    } else {
      insertText(`${ordered ? '1.' : '-'} `)
    }
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      const text = prompt('Enter link text (optional):') || url
      wrapText(`[${text}](`, `)`)
    }
  }

  const insertImage = () => {
    setShowImageUpload(true)
    setImageUploadStep(1)
    setSelectedFile(null)
    setImagePreview(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImageUploadStep(2)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        setImageUploadStep(3)
      }
      reader.readAsDataURL(file)
    }
  }

  const insertImageToEditor = () => {
    if (imagePreview) {
      const alt = prompt('Enter alt text for image (optional):') || 'Image'
      insertText(`![${alt}](${imagePreview})`)
      setShowImageUpload(false)
      setImageUploadStep(1)
      setSelectedFile(null)
      setImagePreview(null)
    }
  }

  const insertVideo = () => {
    const url = prompt('Enter video URL (YouTube, Vimeo, etc.):')
    if (url) {
      const title = prompt('Enter video title (optional):') || 'Video'
      insertText(`[🎥 ${title}](${url})`)
    }
  }

  const insertTable = () => {
    const table = `| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |`
    insertText(table)
  }

  const insertStrikethrough = () => {
    wrapText('~~', '~~')
  }

  const insertHighlight = () => {
    wrapText('==', '==')
  }

  const insertCodeBlock = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText) {
      const newText = `\`\`\`\n${selectedText}\n\`\`\``
      const newValue = value.substring(0, start) + newText + value.substring(end)
      onChange(newValue)
    } else {
      insertText('```\n\n```')
    }
  }

  const insertHorizontalRule = () => {
    insertText('\n---\n')
  }

  const insertMention = () => {
    const mention = prompt('Enter @username:')
    if (mention) {
      insertText(`@${mention}`)
    }
  }

  const insertHashtag = () => {
    const hashtag = prompt('Enter #hashtag:')
    if (hashtag) {
      insertText(`#${hashtag}`)
    }
  }

  const insertDateTime = () => {
    const now = new Date()
    const dateTime = now.toLocaleString()
    insertText(dateTime)
  }

  const insertLocation = () => {
    const location = prompt('Enter location:')
    if (location) {
      insertText(`📍 ${location}`)
    }
  }

  const insertPhone = () => {
    const phone = prompt('Enter phone number:')
    if (phone) {
      insertText(`📞 ${phone}`)
    }
  }

  const insertEmail = () => {
    const email = prompt('Enter email:')
    if (email) {
      insertText(`📧 ${email}`)
    }
  }

  const insertWebsite = () => {
    const website = prompt('Enter website URL:')
    if (website) {
      const title = prompt('Enter website title (optional):') || website
      insertText(`🌐 [${title}](${website})`)
    }
  }

  const saveToHistory = (newValue: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newValue)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      onChange(history[newIndex])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      onChange(history[newIndex])
    }
  }

  const copyText = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
      if (selectedText) {
        navigator.clipboard.writeText(selectedText)
        alert('Text copied to clipboard!')
      } else {
        navigator.clipboard.writeText(value)
        alert('All text copied to clipboard!')
      }
    }
  }

  const cutText = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    if (selectedText) {
      navigator.clipboard.writeText(selectedText)
      const newValue = value.substring(0, start) + value.substring(end)
      onChange(newValue)
      alert('Text cut to clipboard!')
    }
  }

  const increaseFontSize = () => {
    wrapText('<span style="font-size: larger;">', '</span>')
  }

  const decreaseFontSize = () => {
    wrapText('<span style="font-size: smaller;">', '</span>')
  }

  const handleEmojiSelect = (emoji: string) => {
    insertText(emoji)
    setShowEmojiToolbar(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      insertText('  ') // Insert 2 spaces for indentation
    }
    
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          e.preventDefault()
          undo()
          break
        case 'y':
          e.preventDefault()
          redo()
          break
        case 'b':
          e.preventDefault()
          wrapText('**', '**')
          break
        case 'i':
          e.preventDefault()
          wrapText('*', '*')
          break
        case 'u':
          e.preventDefault()
          wrapText('<u>', '</u>')
          break
        case 'c':
          e.preventDefault()
          copyText()
          break
        case 'x':
          e.preventDefault()
          cutText()
          break
        case '1':
          e.preventDefault()
          insertHeading(1)
          break
        case '2':
          e.preventDefault()
          insertHeading(2)
          break
        case '3':
          e.preventDefault()
          insertHeading(3)
          break
      }
    }
  }

  const handleTextareaClick = () => {
    const textarea = textareaRef.current
    if (textarea) {
      setCursorPosition(textarea.selectionStart)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setShowTextStyleDropdown(false)
        setShowColorDropdown(false)
        setShowAlignmentDropdown(false)
        setShowMoreDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const [showTextStyleDropdown, setShowTextStyleDropdown] = useState(false)
  const [showColorDropdown, setShowColorDropdown] = useState(false)
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [imageUploadStep, setImageUploadStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const textStyles = [
    { label: 'Normal', value: 'normal', onClick: () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      if (selectedText) {
        // Remove any existing formatting
        const cleanText = selectedText.replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/<u>(.*?)<\/u>/g, '$1')
          .replace(/~~(.*?)~~/g, '$1')
        const newValue = value.substring(0, start) + cleanText + value.substring(end)
        onChange(newValue)
      }
    }},
    { label: 'Heading 1', value: 'h1', onClick: () => insertHeading(1) },
    { label: 'Heading 2', value: 'h2', onClick: () => insertHeading(2) },
    { label: 'Heading 3', value: 'h3', onClick: () => insertHeading(3) },
    { label: 'Heading 4', value: 'h4', onClick: () => insertHeading(4) },
    { label: 'Heading 5', value: 'h5', onClick: () => insertHeading(5) },
    { label: 'Heading 6', value: 'h6', onClick: () => insertHeading(6) }
  ]

  const colors = [
    { name: 'Default', color: '#000000', onClick: () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      if (selectedText) {
        // Remove color formatting
        const cleanText = selectedText.replace(/<span style="color: [^"]*;">(.*?)<\/span>/g, '$1')
        const newValue = value.substring(0, start) + cleanText + value.substring(end)
        onChange(newValue)
      }
    }},
    { name: 'Red', color: '#ef4444', onClick: () => wrapText('<span style="color: #ef4444;">', '</span>') },
    { name: 'Orange', color: '#f97316', onClick: () => wrapText('<span style="color: #f97316;">', '</span>') },
    { name: 'Yellow', color: '#eab308', onClick: () => wrapText('<span style="color: #eab308;">', '</span>') },
    { name: 'Green', color: '#22c55e', onClick: () => wrapText('<span style="color: #22c55e;">', '</span>') },
    { name: 'Blue', color: '#3b82f6', onClick: () => wrapText('<span style="color: #3b82f6;">', '</span>') },
    { name: 'Purple', color: '#a855f7', onClick: () => wrapText('<span style="color: #a855f7;">', '</span>') },
    { name: 'Pink', color: '#ec4899', onClick: () => wrapText('<span style="color: #ec4899;">', '</span>') },
    { name: 'Gray', color: '#6b7280', onClick: () => wrapText('<span style="color: #6b7280;">', '</span>') }
  ]

  const alignmentOptions = [
    { icon: <List className="w-4 h-4" />, label: 'Bullet List', onClick: () => insertList(false) },
    { icon: <ListOrdered className="w-4 h-4" />, label: 'Numbered List', onClick: () => insertList(true) },
    { icon: <AlignLeft className="w-4 h-4" />, label: 'Align Left', onClick: () => wrapText('<div style="text-align: left;">', '</div>') },
    { icon: <AlignRight className="w-4 h-4" />, label: 'Align Right', onClick: () => wrapText('<div style="text-align: right;">', '</div>') }
  ]

  const moreOptions = [
    { icon: <List className="w-4 h-4" />, label: 'Bullet List', onClick: () => insertList(false) },
    { icon: <ListOrdered className="w-4 h-4" />, label: 'Numbered List', onClick: () => insertList(true) },
    { icon: <AlignLeft className="w-4 h-4" />, label: 'Align Left', onClick: () => wrapText('<div style="text-align: left;">', '</div>') },
    { icon: <AlignCenter className="w-4 h-4" />, label: 'Align Center', onClick: () => wrapText('<div style="text-align: center;">', '</div>') },
    { icon: <AlignRight className="w-4 h-4" />, label: 'Align Right', onClick: () => wrapText('<div style="text-align: right;">', '</div>') },
    { icon: <Strikethrough className="w-4 h-4" />, label: 'Strikethrough', onClick: insertStrikethrough },
    { icon: <X className="w-4 h-4" />, label: 'Clear Format', onClick: () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      if (selectedText) {
        // Remove all formatting
        const cleanText = selectedText
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/<u>(.*?)<\/u>/g, '$1')
          .replace(/~~(.*?)~~/g, '$1')
          .replace(/<span style="color: [^"]*;">(.*?)<\/span>/g, '$1')
          .replace(/<div style="text-align: [^"]*;">(.*?)<\/div>/g, '$1')
        const newValue = value.substring(0, start) + cleanText + value.substring(end)
        onChange(newValue)
      }
    }}
  ]

  return (
    <div className={`rich-text-editor relative ${className}`}>
      {/* Professional Toolbar - Exactly like your image */}
      <div className="bg-gray-800 rounded-lg p-2 mb-4 shadow-lg">
        {/* Top Row */}
        <div className="flex items-center gap-1 mb-2">
          {/* Undo/Redo */}
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          {/* Text Style Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTextStyleDropdown(!showTextStyleDropdown)}
              className="h-8 px-3 text-white hover:bg-gray-700 flex items-center gap-1"
            >
              <Type className="w-4 h-4" />
              <span className="text-sm">Paragraph</span>
              <span className="text-xs">▼</span>
            </Button>
            
            {showTextStyleDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-50 min-w-32">
                {textStyles.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      style.onClick()
                      setShowTextStyleDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          {/* Formatting Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => wrapText('**', '**')}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700 font-bold"
            title="Bold (Ctrl+B)"
          >
            B
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => wrapText('*', '*')}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700 italic"
            title="Italic (Ctrl+I)"
          >
            I
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => wrapText('<u>', '</u>')}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700 underline"
            title="Underline (Ctrl+U)"
          >
            U
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertStrikethrough}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700 line-through"
            title="Strikethrough"
          >
            S
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Special Characters"
          >
            &
          </Button>
          
          {/* Color Picker Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowColorDropdown(!showColorDropdown)}
              className="h-8 w-8 p-0 text-white hover:bg-gray-700 flex items-center gap-1"
              title="Text Color"
            >
              <span className="text-sm font-bold">A</span>
              <span className="text-xs">▼</span>
            </Button>
            
            {showColorDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-50 p-2">
                <div className="grid grid-cols-3 gap-1">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        color.onClick()
                        setShowColorDropdown(false)
                      }}
                      className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-400"
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t">
                  <button className="w-full h-6 bg-gray-100 rounded flex items-center justify-center text-xs hover:bg-gray-200">
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          {/* Lists and Structure */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertList(false)}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertList(true)}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => wrapText('> ')}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertCodeBlock}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Bottom Row */}
        <div className="flex items-center gap-1">
          {/* Media and Links */}
          <Button
            variant="ghost"
            size="sm"
            onClick={insertLink}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertImage}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertVideo}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Video"
          >
            <Video className="w-4 h-4" />
          </Button>
          
          {/* Social Features */}
          <Button
            variant="ghost"
            size="sm"
            onClick={insertMention}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Mention (@username)"
          >
            <AtSign className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertHashtag}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Hashtag (#tag)"
          >
            <Hash className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertDateTime}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Date/Time"
          >
            <Calendar className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertLocation}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Location"
          >
            <MapPin className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertPhone}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Phone"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertEmail}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Email"
          >
            <Mail className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertWebsite}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Insert Website"
          >
            <Globe className="w-4 h-4" />
          </Button>
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          {/* Font Controls */}
          <Button
            variant="ghost"
            size="sm"
            onClick={increaseFontSize}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Increase Font Size"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={decreaseFontSize}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Decrease Font Size"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyText}
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            title="Copy Text"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          {/* More Options Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className="h-8 w-8 p-0 text-white hover:bg-gray-700"
              title="More Options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            
            {showMoreDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-50 min-w-40">
                {moreOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.onClick()
                      setShowMoreDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Emoji Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiToolbar(!showEmojiToolbar)}
            className={`h-8 w-8 p-0 text-white hover:bg-gray-700 ${showEmojiToolbar ? 'bg-gray-700' : ''}`}
            title="Insert Emoji"
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Emoji Toolbar */}
      <EmojiToolbar
        isOpen={showEmojiToolbar}
        onClose={() => setShowEmojiToolbar(false)}
        onEmojiSelect={handleEmojiSelect}
      />

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Upload Image</h3>
            
            {/* Step 1: File Selection */}
            {imageUploadStep === 1 && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Step 1: Select an image file</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  Choose File
                </label>
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="ml-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Step 2: Processing */}
            {imageUploadStep === 2 && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">Step 2: Processing image...</p>
                </div>
              </div>
            )}

            {/* Step 3: Preview & Insert */}
            {imageUploadStep === 3 && imagePreview && (
              <div>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto flex items-center justify-center mb-2">
                    <ImageIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Step 3: Preview and insert</p>
                </div>
                
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    File: {selectedFile?.name} ({(selectedFile?.size || 0 / 1024).toFixed(1)} KB)
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={insertImageToEditor}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Insert Image
                  </button>
                  <button
                    onClick={() => setShowImageUpload(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text Editor */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          onChange(newValue)
          saveToHistory(newValue)
        }}
        onKeyDown={handleKeyDown}
        onClick={handleTextareaClick}
        placeholder={placeholder}
        className="min-h-[300px] resize-none text-sm leading-relaxed bg-white border-2 border-gray-200 rounded-lg p-4 font-mono"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
          lineHeight: '32px'
        }}
      />

      {/* Character Count */}
      <div className="character-count flex justify-between items-center">
        <div className="flex gap-4">
          <span>Characters: {value.length}</span>
          <span>Words: {value.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
        <div className="text-purple-600 font-medium">
          💡 Use the toolbar above to format your text!
        </div>
      </div>
    </div>
  )
}
