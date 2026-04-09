import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, TrendingUp, Briefcase, Heart, AlertCircle, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

type Subcategory = {
  id: string;
  name: string;
  time: string;
  quality: number;
};

type Pillar = {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
  color: string;
};

export function EmotionalPillars() {
  const navigate = useNavigate();
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [pillars, setPillars] = useState<Pillar[]>([
    {
      id: 'personal',
      name: 'Dog Mom',
      icon: <Heart className="w-5 h-5" />,
      subcategories: [
        { id: 'personal-main', name: 'Personal', time: '', quality: 5 },
      ],
      color: 'bg-pink-100 text-pink-600',
    },
    {
      id: 'work',
      name: 'Machine Learning Technician',
      icon: <Briefcase className="w-5 h-5" />,
      subcategories: [
        { id: 'work-main', name: 'Researcher', time: '', quality: 5 },
        { id: 'work-second', name: 'Data Collecter', time: '', quality: 5 },

      ],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'athletic',
      name: 'Endurance Athlete',
      icon: <TrendingUp className="w-5 h-5" />,
      subcategories: [
        { id: 'athletic-main', name: 'Swimmer', time: '', quality: 5 },
        { id: 'athletic-second', name: 'Road Biker', time: '', quality: 5 },
        { id: 'athletic-third', name: 'Road Runner', time: '', quality: 5 },

      ],
      color: 'bg-green-100 text-green-600',
    },
  ]);

  const updateSubcategoryTime = (pillarId: string, subId: string, time: string) => {
    setPillars((prev) =>
      prev.map((p) =>
        p.id === pillarId
          ? { ...p, subcategories: p.subcategories.map((s) => (s.id === subId ? { ...s, time } : s)) }
          : p,
      ),
    );
  };

  const updateSubcategoryQuality = (pillarId: string, subId: string, quality: number) => {
    setPillars((prev) =>
      prev.map((p) =>
        p.id === pillarId
          ? { ...p, subcategories: p.subcategories.map((s) => (s.id === subId ? { ...s, quality } : s)) }
          : p,
      ),
    );
  };

  const addSubcategory = (pillarId: string, name: string) => {
    const id = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    setPillars((prev) =>
      prev.map((p) => (p.id === pillarId ? { ...p, subcategories: [...p.subcategories, { id, name, time: '', quality: 5 }] } : p)),
    );
  };

  const removeSubcategory = (pillarId: string, subId: string) => {
    setPillars((prev) => prev.map((p) => (p.id === pillarId ? { ...p, subcategories: p.subcategories.filter((s) => s.id !== subId) } : p)));
  };
  
  const [newSubNames, setNewSubNames] = useState<Record<string, string>>({});
  const [newPillarName, setNewPillarName] = useState('');

  const calculateWellbeingScore = () => {
    // Sum times across all subcategories
    const allSubcategories = pillars.flatMap((p) => p.subcategories);
    const totalTime = allSubcategories.reduce((sum, s) => sum + (parseFloat(s.time) || 0), 0);
    const avgQuality = allSubcategories.length ? allSubcategories.reduce((sum, s) => sum + s.quality, 0) / allSubcategories.length : 0;
    
    // Simple scoring algorithm
    const timeScore = Math.min(totalTime / 24, 1) * 50;
    const qualityScore = (avgQuality / 10) * 50;
    
    return Math.round(timeScore + qualityScore);
  };

  const wellbeingScore = calculateWellbeingScore();

  const handleSubmit = () => {
    // Finish the check-in flow for step 3
    navigate('/complete');
  };

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const confirmSkip = () => {
    setShowSkipDialog(false);
    navigate('/check-in');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 py-6 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/check-in')} className="p-1 -ml-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-black-600 font-medium">STEP 3</span>
            </div>
            <h1 className="font-semibold text-lg">Balance Check</h1>
            <p className="text-sm text-gray-600">How balanced are your pillars?</p>
          </div>
        </div>
        <div className="h-1 bg-gray-200 rounded-full mt-3">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        <div className="space-y-6">
          {/* Wellbeing Score */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Balance Score</p>
              <div className="text-4xl font-bold text-blue-600 mb-1">{wellbeingScore}</div>
                <p className="text-xs text-gray-500">Based on time and quality across pillars</p>
                <p className="text-sm text-gray-600 mt-3">
                  You are an athlete, but we know other areas of your life are just as important. Your current pillars are: <strong>Dog Mom</strong>, <strong>Machine Learning Technician</strong>, and <strong>Endurance Athlete</strong>.
                </p>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="font-semibold text-sm text-gray-700 px-1">Your Life Pillars</h2>
            
            {pillars.map((pillar, idx) => (
              <Card key={pillar.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <h3 className="font-medium flex-1">{pillar.name}</h3>
                  <button
                    type="button"
                    onClick={() => setPillars((prev) => prev.filter((_, i) => i !== idx))}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                    aria-label={`Delete ${pillar.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subcategories */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Categories to track under this pillar</div>
                  <div className="space-y-3">
                    {pillar.subcategories.map((sub) => (
                      <div key={sub.id} className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{sub.name}</div>
                          <button
                            type="button"
                            onClick={() => removeSubcategory(pillar.id, sub.id)}
                            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                            aria-label={`Delete ${sub.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            id={`${pillar.id}-${sub.id}-time`}
                            type="number"
                            step="0.5"
                            placeholder="0"
                            value={sub.time}
                            onChange={(e) => updateSubcategoryTime(pillar.id, sub.id, e.target.value)}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600">hours</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm text-gray-600">Quality of Time</Label>
                            <span className="text-sm font-semibold text-blue-600">{sub.quality}/10</span>
                          </div>
                          <Slider
                            value={[sub.quality]}
                            onValueChange={(value) => updateSubcategoryQuality(pillar.id, sub.id, value[0])}
                            min={0}
                            max={10}
                            step={1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Poor quality</span>
                            <span>Excellent quality</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={newSubNames[pillar.id] || ''}
                        onChange={(e) => setNewSubNames((prev) => ({ ...prev, [pillar.id]: e.target.value }))}
                        placeholder="Add a new category to track"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          const name = (newSubNames[pillar.id] || '').trim();
                          if (!name) return;
                          addSubcategory(pillar.id, name);
                          setNewSubNames((prev) => ({ ...prev, [pillar.id]: '' }));
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              ))}

            <div className="p-4 bg-white border rounded-lg">
              <div className="flex items-center gap-2">
                <Input
                  value={newPillarName}
                  onChange={(e) => setNewPillarName(e.target.value)}
                  placeholder="Add a new pillar (e.g. Parent, Researcher)"
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    const name = newPillarName.trim();
                    if (!name) return;
                    const newPillar: Pillar = {
                      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                      name,
                      icon: <Heart className="w-5 h-5" />,
                      subcategories: [{ id: `${name.toLowerCase().replace(/\s+/g, '-')}-main-${Date.now()}`, name, time: '', quality: 5 }],
                      color: 'bg-gray-100 text-gray-700',
                    };
                    setPillars((prev) => [...prev, newPillar]);
                    setNewPillarName('');
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Understanding Your Balance:</strong>
              <br />
              Your balance score reflects how well you're distributing time and energy across your core life pillars. 
              Aim for balanced time distribution and high quality in each area.
            </p>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleSkip}>
            Skip
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            Finish Check-In
          </Button>
        </div>
      </div>

      {/* Skip Warning Dialog */}
      <AlertDialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <AlertDialogContent className="max-w-sm mx-4">
          <AlertDialogHeader>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <AlertDialogTitle className="text-center">Skip This Section?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Incomplete data will lead to incomplete results. Our AI won't be able to fully personalize your training recommendations without this information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction onClick={confirmSkip} className="w-full">
              Skip Anyway
            </AlertDialogAction>
            <AlertDialogCancel className="w-full m-0">
              Continue Filling Out
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}