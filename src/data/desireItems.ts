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
  },

  // More Adult & Direct Content
  {
    id: 'sensual_striptease',
    title: 'Sensual Striptease Performance',
    description: 'Give your partner a seductive striptease with slow, deliberate movements',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e84393'
  },
  {
    id: 'intimate_massage',
    title: 'Intimate Full Body Massage',
    description: 'Give each other a passionate massage using warming oils and sensual touches',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#fd79a8'
  },
  {
    id: 'passionate_dance_nude',
    title: 'Passionate Dance in Underwear',
    description: 'Dance sensually together wearing only underwear, feeling each other\'s body',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#f8b500'
  },
  {
    id: 'blindfold_exploration',
    title: 'Blindfolded Body Exploration',
    description: 'Blindfold your partner and explore their body with your hands and mouth',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#6c5ce7'
  },
  {
    id: 'ice_play',
    title: 'Sensual Ice Play',
    description: 'Use ice cubes to create thrilling sensations on your partner\'s body',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#00b894'
  },
  {
    id: 'feather_tickling',
    title: 'Feather Sensation Play',
    description: 'Use feathers to create sensual stimulation all over your partner\'s body',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#0984e3'
  },
  {
    id: 'passionate_kissing',
    title: 'Passionate Kissing Session',
    description: 'Engage in intense, passionate kissing while exploring each other\'s bodies',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e17055'
  },
  {
    id: 'sensual_shower',
    title: 'Sensual Shower Together',
    description: 'Take a steamy shower together, washing and caressing each other\'s bodies',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#fd79a8'
  },
  {
    id: 'lap_dance',
    title: 'Sensual Lap Dance',
    description: 'Give your partner a seductive lap dance with intimate contact',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e84393'
  },
  {
    id: 'roleplay_fantasy',
    title: 'Roleplay Fantasy Night',
    description: 'Act out your wildest fantasies with costumes and roleplay scenarios',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#6c5ce7'
  },
  {
    id: 'temperature_play',
    title: 'Temperature Sensation Play',
    description: 'Use hot and cold sensations to create intense pleasure and arousal',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#00b894'
  },
  {
    id: 'dirty_talk_session',
    title: 'Dirty Talk & Whispering',
    description: 'Whisper your wildest fantasies and desires in your partner\'s ear',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#0984e3'
  },

  // EXTREME LEVEL - Google Search Based
  {
    id: 'extreme_striptease',
    title: 'Extreme Striptease Performance',
    description: 'Perform a seductive striptease ending completely naked',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e84393'
  },
  {
    id: 'sexy_photoshoot',
    title: 'Sexy Photoshoot Session',
    description: 'Have an intimate photoshoot with your partner',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#f8b500'
  },
  {
    id: 'sexy_video_creation',
    title: 'Sexy Video Creation',
    description: 'Create intimate videos together for private viewing',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e17055'
  },
  {
    id: 'sexy_story_writing',
    title: 'Sexy Story Writing',
    description: 'Write erotic stories together and read them aloud',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#6c5ce7'
  },
  {
    id: 'sexy_movie_night',
    title: 'Sexy Movie Night',
    description: 'Watch erotic movies together and discuss fantasies',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'intimate',
    color: '#fd79a8'
  },
  {
    id: 'sexy_game_night',
    title: 'Sexy Game Night',
    description: 'Play intimate games designed for couples',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#00b894'
  },
  {
    id: 'extreme_massage',
    title: 'Extreme Sensual Massage',
    description: 'Give each other intense full body massages with oils',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#fd79a8'
  },
  {
    id: 'roleplay_fantasy_night',
    title: 'Roleplay Fantasy Night',
    description: 'Act out your wildest roleplay fantasies together',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#6c5ce7'
  },
  {
    id: 'toys_and_equipment',
    title: 'Toys & Equipment Play',
    description: 'Explore intimate toys and equipment together',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'sensual',
    color: '#e17055'
  },
  {
    id: 'costume_play',
    title: 'Costume & Outfit Play',
    description: 'Dress up in sexy costumes and outfits for each other',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
    category: 'playful',
    color: '#f8b500'
  },
  {
    id: 'public_place_fantasy',
    title: 'Public Place Fantasy',
    description: 'Explore fantasies about intimate moments in public places',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#e84393'
  },
  {
    id: 'threesome_fantasy',
    title: 'Threesome Fantasy Discussion',
    description: 'Discuss and explore threesome fantasies together',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'passionate',
    color: '#6c5ce7'
  }
]
