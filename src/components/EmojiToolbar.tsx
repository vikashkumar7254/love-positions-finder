import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Smile, 
  Heart, 
  Star, 
  ThumbsUp, 
  PartyPopper, 
  Sparkles,
  Search,
  X
} from 'lucide-react'
import { Input } from '@/components/ui/input'

interface EmojiToolbarProps {
  onEmojiSelect: (emoji: string) => void
  isOpen: boolean
  onClose: () => void
}

const emojiCategories = {
  'smileys': {
    icon: <Smile className="w-4 h-4" />,
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐']
  },
  'hearts': {
    icon: <Heart className="w-4 h-4" />,
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💤', '💨', '💭', '💬', '🗨️', '🗯️', '💭', '💤']
  },
  'gestures': {
    icon: <ThumbsUp className="w-4 h-4" />,
    emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '👏', '🙌', '👐', '🤲', '🤜', '🤛', '✊', '👊', '👎', '👍', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '👏', '🙌', '👐', '🤲', '🤜', '🤛', '✊', '👊']
  },
  'celebration': {
    icon: <PartyPopper className="w-4 h-4" />,
    emojis: ['🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍭', '🍬', '🍫', '🍩', '🍪', '🍨', '🍧', '🍦', '🥧', '🍰', '🎂', '🍮', '🍯', '🍪', '🍩', '🍫', '🍬', '🍭', '🍮', '🍯', '🎂', '🍰', '🧁', '🍭', '🍬', '🍫', '🍩', '🍪', '🍨', '🍧', '🍦', '🥧', '🍰', '🎂', '🍮', '🍯', '🍪', '🍩', '🍫', '🍬', '🍭', '🍮', '🍯']
  },
  'stars': {
    icon: <Star className="w-4 h-4" />,
    emojis: ['⭐', '🌟', '💫', '✨', '⚡', '🔥', '💥', '💢', '💯', '💫', '✨', '⭐', '🌟', '💫', '✨', '⚡', '🔥', '💥', '💢', '💯', '💫', '✨', '⭐', '🌟', '💫', '✨', '⚡', '🔥', '💥', '💢', '💯', '💫', '✨', '⭐', '🌟', '💫', '✨', '⚡', '🔥', '💥', '💢', '💯', '💫', '✨', '⭐', '🌟', '💫', '✨', '⚡', '🔥', '💥', '💢', '💯', '💫', '✨']
  },
  'special': {
    icon: <Sparkles className="w-4 h-4" />,
    emojis: ['✨', '🌟', '💫', '⭐', '🔥', '💥', '⚡', '💢', '💯', '🎯', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭']
  },
  'food': {
    icon: <Heart className="w-4 h-4" />,
    emojis: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯']
  },
  'travel': {
    icon: <Star className="w-4 h-4" />,
    emojis: ['✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓', '🚧', '⛽', '🚏', '🚦', '🚥', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '⛺', '🛖', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🛕', '🕍', '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙️', '🌃', '🌌', '🌉', '🌁']
  },
  'activities': {
    icon: <PartyPopper className="w-4 h-4" />,
    emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🏇', '🧘‍♀️', '🧘‍♂️', '🏄‍♀️', '🏄‍♂️', '🏊‍♀️', '🏊‍♂️', '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣‍♂️', '🧗‍♀️', '🧗‍♂️', '🚵‍♀️', '🚵‍♂️', '🚴‍♀️', '🚴‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹', '🤹‍♀️', '🤹‍♂️', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🪘', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♠️', '♥️', '♦️', '♣️', '♟️', '🎯', '🎳', '🎮', '🕹️', '🎰', '🧩', '🎊', '🎉', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍭', '🍬', '🍫', '🍩', '🍪', '🍨', '🍧', '🍦', '🥧', '🍰', '🎂', '🍮', '🍯', '🍪', '🍩', '🍫', '🍬', '🍭', '🍮', '🍯']
  }
}

export default function EmojiToolbar({ onEmojiSelect, isOpen, onClose }: EmojiToolbarProps) {
  const [activeCategory, setActiveCategory] = useState<keyof typeof emojiCategories>('smileys')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmojis = searchTerm 
    ? Object.values(emojiCategories).flatMap(category => 
        category.emojis.filter(emoji => emoji.includes(searchTerm))
      )
    : emojiCategories[activeCategory].emojis

  if (!isOpen) return null

  return (
    <Card className="emoji-toolbar absolute bottom-full left-0 mb-2 w-80 max-h-96 overflow-hidden z-50">
      <div className="p-3 border-b bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-purple-700">Emoji Picker</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-purple-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </div>

      <div className="flex border-b">
        {Object.entries(emojiCategories).map(([key, category]) => (
          <Button
            key={key}
            variant={activeCategory === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(key as keyof typeof emojiCategories)}
            className={`emoji-category-button flex-1 rounded-none h-10 ${
              activeCategory === key 
                ? 'bg-purple-600 text-white active' 
                : 'hover:bg-purple-50 text-purple-600'
            }`}
          >
            {category.icon}
          </Button>
        ))}
      </div>

      <div className="p-3 max-h-48 overflow-y-auto emoji-grid">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => {
                onEmojiSelect(emoji)
                onClose()
              }}
              className="emoji-button h-8 w-8 p-0 text-lg"
            >
              {emoji}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
