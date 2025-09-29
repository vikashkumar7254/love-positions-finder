export interface DesireItem {
  id: string
  title: string
  description: string
  image: string
  category: 'romantic' | 'passionate' | 'playful' | 'sensual'
  color: string
}

export const desireItems: DesireItem[] = [
  {
    id: 'romantic_dinner',
    title: 'Romantic Candlelight Dinner',
    description: 'Set up a beautiful candlelit dinner with soft music and intimate conversation',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&crop=center',
    category: 'romantic',
    color: '#ff6b9d'
  },
  {
    id: 'sensual_massage',
    title: 'Sensual Massage Session',
    description: 'Give each other relaxing massages with aromatic oils and gentle touches',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#c44569'
  },
  {
    id: 'passionate_dance',
    title: 'Passionate Dance Together',
    description: 'Dance slowly to romantic music, feeling each other\'s rhythm and heartbeat',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#f8b500'
  },
  {
    id: 'playful_games',
    title: 'Playful Intimate Games',
    description: 'Engage in fun, flirty games that bring you closer together',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#6c5ce7'
  },
  {
    id: 'bubble_bath',
    title: 'Luxurious Bubble Bath',
    description: 'Share a warm, relaxing bubble bath with candles and champagne',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'romantic',
    color: '#00b894'
  },
  {
    id: 'stargazing',
    title: 'Romantic Stargazing',
    description: 'Lie under the stars together, sharing dreams and intimate whispers',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center',
    category: 'romantic',
    color: '#0984e3'
  },
  {
    id: 'wine_tasting',
    title: 'Wine & Chocolate Tasting',
    description: 'Indulge in fine wines and chocolates while feeding each other',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#e17055'
  },
  {
    id: 'surprise_picnic',
    title: 'Surprise Indoor Picnic',
    description: 'Create a romantic picnic setup in your living room with soft blankets',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#fd79a8'
  }
]
