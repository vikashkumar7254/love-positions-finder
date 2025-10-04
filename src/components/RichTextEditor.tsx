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
  EyeOff
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
    const url = prompt('Enter image URL:')
    if (url) {
      const alt = prompt('Enter alt text (optional):') || 'Image'
      insertText(`![${alt}](${url})`)
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
    insertText('<span style="font-size: larger;">', '</span>')
  }

  const decreaseFontSize = () => {
    insertText('<span style="font-size: smaller;">', '</span>')
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

  const toolbarButtons = [
    // Undo/Redo
    {
      icon: <Undo className="w-4 h-4" />,
      onClick: undo,
      title: 'Undo',
      shortcut: 'Ctrl+Z'
    },
    {
      icon: <Redo className="w-4 h-4" />,
      onClick: redo,
      title: 'Redo',
      shortcut: 'Ctrl+Y'
    },
    { separator: true },
    // Headers
    {
      icon: <Type className="w-4 h-4" />,
      onClick: () => insertHeading(1),
      title: 'Heading 1',
      shortcut: 'Ctrl+1'
    },
    {
      icon: <Type className="w-4 h-4" />,
      onClick: () => insertHeading(2),
      title: 'Heading 2',
      shortcut: 'Ctrl+2'
    },
    {
      icon: <Type className="w-4 h-4" />,
      onClick: () => insertHeading(3),
      title: 'Heading 3',
      shortcut: 'Ctrl+3'
    },
    { separator: true },
    // Text Formatting
    {
      icon: <Bold className="w-4 h-4" />,
      onClick: () => wrapText('**', '**'),
      title: 'Bold',
      shortcut: 'Ctrl+B'
    },
    {
      icon: <Italic className="w-4 h-4" />,
      onClick: () => wrapText('*', '*'),
      title: 'Italic',
      shortcut: 'Ctrl+I'
    },
    {
      icon: <Underline className="w-4 h-4" />,
      onClick: () => wrapText('<u>', '</u>'),
      title: 'Underline',
      shortcut: 'Ctrl+U'
    },
    {
      icon: <Strikethrough className="w-4 h-4" />,
      onClick: insertStrikethrough,
      title: 'Strikethrough'
    },
    {
      icon: <Highlighter className="w-4 h-4" />,
      onClick: insertHighlight,
      title: 'Highlight'
    },
    { separator: true },
    // Lists and Structure
    {
      icon: <List className="w-4 h-4" />,
      onClick: () => insertList(false),
      title: 'Bullet List'
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => insertList(true),
      title: 'Numbered List'
    },
    {
      icon: <Quote className="w-4 h-4" />,
      onClick: () => wrapText('> '),
      title: 'Quote'
    },
    {
      icon: <Code className="w-4 h-4" />,
      onClick: () => wrapText('`', '`'),
      title: 'Inline Code'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      onClick: insertCodeBlock,
      title: 'Code Block'
    },
    {
      icon: <Table className="w-4 h-4" />,
      onClick: insertTable,
      title: 'Insert Table'
    },
    {
      icon: <Minus className="w-4 h-4" />,
      onClick: insertHorizontalRule,
      title: 'Horizontal Rule'
    },
    { separator: true },
    // Media and Links
    {
      icon: <Link className="w-4 h-4" />,
      onClick: insertLink,
      title: 'Insert Link'
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      onClick: insertImage,
      title: 'Insert Image'
    },
    {
      icon: <Video className="w-4 h-4" />,
      onClick: insertVideo,
      title: 'Insert Video'
    },
    { separator: true },
    // Social and Special
    {
      icon: <AtSign className="w-4 h-4" />,
      onClick: insertMention,
      title: 'Mention (@username)'
    },
    {
      icon: <Hash className="w-4 h-4" />,
      onClick: insertHashtag,
      title: 'Hashtag (#tag)'
    },
    {
      icon: <Smile className="w-4 h-4" />,
      onClick: () => setShowEmojiToolbar(!showEmojiToolbar),
      title: 'Insert Emoji',
      active: showEmojiToolbar
    },
    { separator: true },
    // Contact Info
    {
      icon: <Calendar className="w-4 h-4" />,
      onClick: insertDateTime,
      title: 'Insert Date/Time'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      onClick: insertLocation,
      title: 'Insert Location'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      onClick: insertPhone,
      title: 'Insert Phone'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      onClick: insertEmail,
      title: 'Insert Email'
    },
    {
      icon: <Globe className="w-4 h-4" />,
      onClick: insertWebsite,
      title: 'Insert Website'
    },
    { separator: true },
    // Font Size
    {
      icon: <Plus className="w-4 h-4" />,
      onClick: increaseFontSize,
      title: 'Increase Font Size'
    },
    {
      icon: <Minus className="w-4 h-4" />,
      onClick: decreaseFontSize,
      title: 'Decrease Font Size'
    },
    { separator: true },
    // Edit Actions
    {
      icon: <Copy className="w-4 h-4" />,
      onClick: copyText,
      title: 'Copy Text',
      shortcut: 'Ctrl+C'
    },
    {
      icon: <Scissors className="w-4 h-4" />,
      onClick: cutText,
      title: 'Cut Text',
      shortcut: 'Ctrl+X'
    },
    {
      icon: <Save className="w-4 h-4" />,
      onClick: () => navigator.clipboard.writeText(value),
      title: 'Save to Clipboard'
    }
  ]

  return (
    <div className={`rich-text-editor relative ${className}`}>
      {/* Toolbar */}
      <Card className="rich-text-toolbar mb-2">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarButtons.map((button, index) => {
            if (button.separator) {
              return <div key={index} className="toolbar-separator" />
            }
            
            return (
              <Button
                key={index}
                variant={button.active ? "default" : "ghost"}
                size="sm"
                onClick={button.onClick}
                className={`toolbar-button h-8 px-2 ${
                  button.active 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-purple-100 text-purple-600'
                }`}
                title={`${button.title} ${button.shortcut ? `(${button.shortcut})` : ''}`}
              >
                {button.icon}
              </Button>
            )
          })}
        </div>
      </Card>

      {/* Emoji Toolbar */}
      <EmojiToolbar
        isOpen={showEmojiToolbar}
        onClose={() => setShowEmojiToolbar(false)}
        onEmojiSelect={handleEmojiSelect}
      />

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
        className="rich-text-textarea min-h-[300px] resize-none text-sm leading-relaxed"
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
