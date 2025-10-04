import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/enhanced-button'
import { Card, CardContent } from '@/components/ui/enhanced-card'
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
  Save
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

  // Formatting functions
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateContent()
  }

  const updateContent = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

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

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />`
      insertText(img)
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

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
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

  return (
    <div className={`relative ${className}`}>
      {/* Toolbar */}
      <div className="rich-text-toolbar mb-4">
            {/* Text Formatting */}
            <div className="flex gap-1 border-r pr-2 mr-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => execCommand('bold')}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => execCommand('italic')}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => execCommand('underline')}
                title="Underline"
              >
                <Underline className="w-4 h-4" />
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
            </div>

            {/* Media */}
            <div className="flex gap-1 border-r pr-2 mr-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImageUpload(true)}
                title="Insert Image"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVideoUpload(true)}
                title="Insert Video"
              >
                <Video className="w-4 h-4" />
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

            {/* Special */}
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

            {/* Preview */}
            <div className="flex gap-1">
              <Button
                variant={isPreview ? "default" : "outline"}
                size="sm"
                onClick={togglePreview}
                title="Toggle Preview"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

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
      {(showEmojiPicker || showImageUpload || showVideoUpload) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={() => {
            setShowEmojiPicker(false)
            setShowImageUpload(false)
            setShowVideoUpload(false)
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

      {/* Character Count */}
      <div className="character-count">
        {value.replace(/<[^>]*>/g, '').length} characters
      </div>
    </div>
  )
}

export default RichTextEditor
