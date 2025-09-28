import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { AdminProtectedRoute } from "@/components/AdminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Upload, Image as ImageIcon, Tag, Type, Heart, CheckCircle2 } from "lucide-react";
import type { StyleType, DifficultyLevel, Position } from "@/types";

const STORAGE_KEY = "userPositions";

function makeId(title: string) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return `user-${slug || Date.now()}`;
}

function AddPositionContent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [style, setStyle] = useState<StyleType>("romantic");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [category, setCategory] = useState("Custom");
  const [tags, setTags] = useState("gentle, custom");
  const [duration, setDuration] = useState("10-20 minutes");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [saved, setSaved] = useState(false);

  const id = useMemo(() => makeId(name), [name]);

  const parseTags = (s: string) => s.split(",").map(t => t.trim()).filter(Boolean);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setFilePreview(dataUrl);
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    if (!name || !description) return;

    const pos: Position = {
      id,
      name,
      description,
      style,
      difficulty,
      category: category || "Custom",
      tags: parseTags(tags),
      instructions: [
        "Communicate boundaries and comfort",
        "Find a comfortable rhythm",
        "Support each other and adjust",
        "Focus on connection and pleasure",
      ],
      benefits: [
        "Enhanced connection",
        "New sensations",
        "Playful exploration",
      ],
      imageUrl: imageUrl || undefined,
      views: 0,
      rating: 4.5,
      duration: duration || "10-20 minutes",
      isPopular: false,
      featured: false,
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr: Position[] = raw ? JSON.parse(raw) : [];
      // De-duplicate by id
      const filtered = arr.filter(p => p.id !== pos.id);
      const next = [pos, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(true);
      setTimeout(() => navigate("/positions/random-generator"), 900);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              Add Position (Admin)
            </h1>
            <p className="text-muted-foreground mt-2">Add a new position with name, style, difficulty and an image (URL or upload).</p>
          </div>

          <Card className="border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle>Position Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Name
                  </label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Squatting Lap Dance" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Lap Dance" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Style</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["romantic","passionate","adventurous","mixed"] as StyleType[]).map(s => (
                      <Button key={s} variant={style===s?"romantic":"outline"} size="sm" onClick={()=>setStyle(s)}>
                        {s.charAt(0).toUpperCase()+s.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["beginner","intermediate","advanced","expert"] as DifficultyLevel[]).map(d => (
                      <Button key={d} variant={difficulty===d?"passionate":"outline"} size="sm" onClick={()=>setDifficulty(d)}>
                        {d.charAt(0).toUpperCase()+d.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Tags (comma separated)
                  </label>
                  <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="chair, lap, squatting" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="10-20 minutes" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <Textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe how this position feels and any quick notes" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Image URL (gif/mp4/webm supported)
                  </label>
                  <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://.../position.gif" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Or Upload Image/Video
                  </label>
                  <Input type="file" accept="image/*,video/*" onChange={onFileChange} />
                  {filePreview && (
                    <div className="mt-2 text-xs text-muted-foreground">Preview ready (stored as data URL)</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" onClick={()=>navigate('/positions/random-generator')}>Cancel</Button>
                <Button variant="hero" onClick={onSave} disabled={!name || !description}>
                  {saved ? (<><CheckCircle2 className="w-4 h-4" /> Saved</>) : (<><Heart className="w-4 h-4" /> Save Position</>)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function AddPosition() {
  return (
    <AdminProtectedRoute>
      <AddPositionContent />
    </AdminProtectedRoute>
  )
}
