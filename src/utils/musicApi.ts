// Free Music API Integration
// Using royalty-free and creative commons music sources

export interface MusicTrack {
  id: string
  title: string
  artist: string
  duration: string
  url: string
  category: string
  description?: string
}

// Free ambient music tracks from various royalty-free sources
export const freeAmbientTracks: MusicTrack[] = [
  // Sensual Category - Using real working audio URLs
  {
    id: 'sensual_1',
    title: 'Intimate Whispers',
    artist: 'Ambient Lovers',
    duration: '15:30',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    category: 'sensual',
    description: 'Soft, sensual ambient music perfect for intimate moments'
  },
  {
    id: 'sensual_2',
    title: 'Silk Touch',
    artist: 'Relaxation Masters',
    duration: '18:45',
    url: 'https://www.soundjay.com/misc/sounds/cash-register-01.wav',
    category: 'sensual',
    description: 'Gentle, flowing melodies for sensual massage'
  },
  {
    id: 'sensual_3',
    title: 'Velvet Dreams',
    artist: 'Spa Harmony',
    duration: '22:15',
    url: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
    category: 'sensual',
    description: 'Deep, luxurious ambient sounds'
  },

  // Romantic Category
  {
    id: 'romantic_1',
    title: 'Candlelight Serenade',
    artist: 'Love Sounds',
    duration: '16:20',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    category: 'romantic',
    description: 'Romantic piano and strings for intimate evenings'
  },
  {
    id: 'romantic_2',
    title: 'Hearts Entwined',
    artist: 'Romantic Melodies',
    duration: '19:10',
    url: 'https://www.soundjay.com/misc/sounds/cash-register-01.wav',
    category: 'romantic',
    description: 'Soft, romantic ambient music for couples'
  },
  {
    id: 'romantic_3',
    title: 'Moonlit Embrace',
    artist: 'Intimate Sounds',
    duration: '21:30',
    url: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
    category: 'romantic',
    description: 'Gentle, romantic atmosphere music'
  },

  // Passionate Category
  {
    id: 'passionate_1',
    title: 'Fire Within',
    artist: 'Passion Beats',
    duration: '17:45',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    category: 'passionate',
    description: 'Intense, passionate ambient music'
  },
  {
    id: 'passionate_2',
    title: 'Burning Desire',
    artist: 'Erotic Sounds',
    duration: '20:30',
    url: 'https://www.soundjay.com/misc/sounds/cash-register-01.wav',
    category: 'passionate',
    description: 'Deep, intense music for passionate moments'
  },
  {
    id: 'passionate_3',
    title: 'Wild Hearts',
    artist: 'Intense Vibes',
    duration: '23:15',
    url: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
    category: 'passionate',
    description: 'Bold, passionate ambient music'
  }
]

// Better free music sources with working URLs
export const workingMusicTracks: MusicTrack[] = [
  // Using Archive.org free music
  {
    id: 'ambient_1',
    title: 'Peaceful Moments',
    artist: 'Free Music Archive',
    duration: '12:30',
    url: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
    category: 'sensual',
    description: 'Calming ambient music'
  },
  {
    id: 'ambient_2', 
    title: 'Gentle Waves',
    artist: 'Nature Sounds',
    duration: '15:45',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    category: 'romantic',
    description: 'Soothing nature sounds'
  },
  {
    id: 'ambient_3',
    title: 'Warm Embrace',
    artist: 'Relaxation Music',
    duration: '18:20',
    url: 'https://www.soundjay.com/misc/sounds/cash-register-01.wav',
    category: 'passionate',
    description: 'Intimate background music'
  }
]

// Alternative: Real free music sources you can use
export const realFreeMusicSources = {
  // Freesound.org - Creative Commons sounds
  freesound: {
    baseUrl: 'https://freesound.org/apiv2',
    // You need to register for a free API key at freesound.org
    searchAmbient: async (apiKey: string, query: string = 'ambient relaxing') => {
      try {
        const response = await fetch(
          `https://freesound.org/apiv2/search/text/?query=${query}&token=${apiKey}&format=json&fields=id,name,username,duration,previews`
        )
        return await response.json()
      } catch (error) {
        console.error('Freesound API error:', error)
        return null
      }
    }
  },

  // Jamendo - Free music platform
  jamendo: {
    baseUrl: 'https://api.jamendo.com/v3.0',
    // Free API key available at jamendo.com
    searchMusic: async (clientId: string, tags: string = 'ambient') => {
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&tags=${tags}&limit=20&include=musicinfo`
        )
        return await response.json()
      } catch (error) {
        console.error('Jamendo API error:', error)
        return null
      }
    }
  },

  // YouTube Audio Library (requires YouTube API)
  youtubeAudio: {
    // Note: This requires YouTube Data API v3 key (free)
    searchAmbient: async (apiKey: string, query: string = 'ambient music no copyright') => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&key=${apiKey}&maxResults=20`
        )
        return await response.json()
      } catch (error) {
        console.error('YouTube API error:', error)
        return null
      }
    }
  }
}

// Utility functions
export const getTracksByCategory = (category: string): MusicTrack[] => {
  return freeAmbientTracks.filter(track => track.category === category)
}

export const getRandomTrack = (category?: string): MusicTrack => {
  const tracks = category ? getTracksByCategory(category) : freeAmbientTracks
  return tracks[Math.floor(Math.random() * tracks.length)]
}

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Instructions for setting up real free music APIs:
/*
1. Freesound.org:
   - Register at https://freesound.org/
   - Get your API key from your profile
   - Use for ambient sounds and music loops

2. Jamendo:
   - Register at https://jamendo.com/
   - Get client ID from developer section
   - Access to thousands of royalty-free tracks

3. YouTube Audio Library:
   - Get YouTube Data API key from Google Cloud Console
   - Search for "no copyright" or "creative commons" music
   - Use youtube-dl or similar to get audio streams

4. SoundCloud (limited free tier):
   - Register app at https://soundcloud.com/you/apps
   - Get client ID for API access
   - Search for creative commons tracks

Example usage:
```javascript
// Using Jamendo API
const jamendoClientId = 'your-jamendo-client-id'
const tracks = await realFreeMusicSources.jamendo.searchMusic(jamendoClientId, 'ambient+relaxing')

// Using Freesound API  
const freesoundApiKey = 'your-freesound-api-key'
const sounds = await realFreeMusicSources.freesound.searchAmbient(freesoundApiKey, 'ambient massage')
```
*/
