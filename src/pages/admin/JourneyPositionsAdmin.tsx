import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Video, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface JourneyPosition {
  id: string
  name: string
  style: 'romantic' | 'passionate' | 'adventurous' | 'mixed'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  imageUrl: string
  mediaType?: 'image' | 'gif' | 'video'
  instructions: string[]
  benefits: string[]
  duration: string
  views: number
  rating: number
  isPopular: boolean
  featured: boolean
}

const JourneyPositionsAdmin = () => {
  const [positions, setPositions] = useState<JourneyPosition[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    style: 'romantic' as 'romantic' | 'passionate' | 'adventurous' | 'mixed',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: '',
    imageUrl: '',
    mediaType: 'image' as 'image' | 'gif' | 'video',
    instructions: '',
    benefits: '',
    duration: '',
    isPopular: false,
    featured: false
  })
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Load positions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journey_positions')
    if (saved) {
      setPositions(JSON.parse(saved))
    }
  }, [])

  // Save positions to localStorage
  const savePositions = (newPositions: JourneyPosition[]) => {
    setPositions(newPositions)
    localStorage.setItem('journey_positions', JSON.stringify(newPositions))
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive"
      })
      return
    }

    setUploadedFile(file)
    
    // Convert to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setFormData(prev => ({
        ...prev,
        imageUrl: result,
        mediaType: file.type.startsWith('video/') ? 'video' : 
                   file.type === 'image/gif' ? 'gif' : 'image'
      }))
    }
    reader.readAsDataURL(file)
  }

  // Add or update position
  const addOrUpdatePosition = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a position name",
        variant: "destructive"
      })
      return
    }

    if (!formData.imageUrl.trim()) {
      toast({
        title: "Image required",
        description: "Please upload an image or enter an image URL",
        variant: "destructive"
      })
      return
    }

    const newPosition: JourneyPosition = {
      id: editingId || `journey-${Date.now()}`,
      name: formData.name.trim(),
      style: formData.style,
      difficulty: formData.difficulty,
      category: formData.category || 'Intimate',
      imageUrl: formData.imageUrl,
      mediaType: formData.mediaType,
      instructions: formData.instructions.split('\n').filter(line => line.trim()),
      benefits: formData.benefits.split('\n').filter(line => line.trim()),
      duration: formData.duration || '10-15 minutes',
      views: Math.floor(Math.random() * 10000),
      rating: 4.5 + Math.random() * 0.5,
      isPopular: formData.isPopular,
      featured: formData.featured
    }

    if (editingId) {
      // Update existing
      const updated = positions.map(p => p.id === editingId ? newPosition : p)
      savePositions(updated)
      toast({
        title: "Position updated",
        description: "Journey position has been updated successfully"
      })
    } else {
      // Add new
      savePositions([...positions, newPosition])
      toast({
        title: "Position added",
        description: "New journey position has been added successfully"
      })
    }

    resetForm()
  }

  // Edit position
  const editPosition = (position: JourneyPosition) => {
    setFormData({
      name: position.name,
      style: position.style,
      difficulty: position.difficulty,
      category: position.category,
      imageUrl: position.imageUrl,
      mediaType: position.mediaType || 'image',
      instructions: position.instructions.join('\n'),
      benefits: position.benefits.join('\n'),
      duration: position.duration,
      isPopular: position.isPopular,
      featured: position.featured
    })
    setEditingId(position.id)
    setIsAdding(true)
  }

  // Delete position
  const deletePosition = (id: string) => {
    const updated = positions.filter(p => p.id !== id)
    savePositions(updated)
    toast({
      title: "Position deleted",
      description: "Journey position has been deleted"
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      style: 'romantic' as const,
      difficulty: 'beginner' as const,
      category: '',
      imageUrl: '',
      mediaType: 'image' as const,
      instructions: '',
      benefits: '',
      duration: '',
      isPopular: false,
      featured: false
    })
    setEditingId(null)
    setIsAdding(false)
    setUploadedFile(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-romantic via-passionate to-romantic bg-clip-text text-transparent mb-4">
            Journey Positions Admin
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage journey positions with images, GIFs, and videos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingId ? 'Edit Position' : 'Add New Position'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Soft Symphony"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Style</label>
                    <Select value={formData.style} onValueChange={(value: any) => setFormData({...formData, style: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="romantic">Romantic</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="adventurous">Adventurous</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Difficulty</label>
                    <Select value={formData.difficulty} onValueChange={(value: any) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g. Intimate Connection"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Media Upload *</label>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <label htmlFor="media-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image, GIF, or video
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max 10MB • JPG, PNG, GIF, MP4 supported
                        </p>
                      </label>
                    </div>
                    
                    <div className="text-center text-sm text-muted-foreground">OR</div>
                    
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="Enter image/video URL"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g. 10-15 minutes"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="hero"
                    onClick={addOrUpdatePosition}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Update' : 'Add'} Position
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Positions List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Journey Positions ({positions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positions.map((position) => (
                    <div key={position.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {position.mediaType === 'video' ? (
                            <video
                              src={position.imageUrl}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <img
                              src={position.imageUrl}
                              alt={position.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{position.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{position.style}</Badge>
                                <Badge variant="outline">{position.difficulty}</Badge>
                                {position.mediaType && (
                                  <Badge variant="outline" className="capitalize">
                                    {position.mediaType}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                {position.category} • {position.duration}
                              </p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editPosition(position)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deletePosition(position.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {positions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No journey positions yet</p>
                      <p className="text-sm">Add your first position to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyPositionsAdmin
