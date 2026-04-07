import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, TrendingUp, Briefcase, Heart, AlertCircle } from 'lucide-react';
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

type Pillar = {
  id: string;
  name: string;
  icon: React.ReactNode;
  time: string;
  quality: number;
  color: string;
};

export function EmotionalPillars() {
  const navigate = useNavigate();
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [pillars, setPillars] = useState<Pillar[]>([
    {
      id: 'personal',
      name: 'Personal Life',
      icon: <Heart className="w-5 h-5" />,
      time: '',
      quality: 5,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      id: 'work',
      name: 'Work Life',
      icon: <Briefcase className="w-5 h-5" />,
      time: '',
      quality: 5,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'athletic',
      name: 'Athletic Life',
      icon: <TrendingUp className="w-5 h-5" />,
      time: '',
      quality: 5,
      color: 'bg-green-100 text-green-600',
    },
  ]);

  const updatePillarTime = (id: string, time: string) => {
    setPillars(pillars.map((p) => (p.id === id ? { ...p, time } : p)));
  };

  const updatePillarQuality = (id: string, quality: number) => {
    setPillars(pillars.map((p) => (p.id === id ? { ...p, quality } : p)));
  };

  const calculateWellbeingScore = () => {
    const totalTime = pillars.reduce((sum, p) => sum + (parseFloat(p.time) || 0), 0);
    const avgQuality = pillars.reduce((sum, p) => sum + p.quality, 0) / pillars.length;
    
    // Simple scoring algorithm
    const timeScore = Math.min(totalTime / 24, 1) * 50;
    const qualityScore = (avgQuality / 10) * 50;
    
    return Math.round(timeScore + qualityScore);
  };

  const wellbeingScore = calculateWellbeingScore();

  const handleSubmit = () => {
    navigate('/check-in');
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
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="font-semibold text-sm text-gray-700 px-1">Your Life Pillars</h2>
            
            {pillars.map((pillar) => (
              <Card key={pillar.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <h3 className="font-medium">{pillar.name}</h3>
                </div>

                {/* Time Spent */}
                <div className="mb-4">
                  <Label htmlFor={`${pillar.id}-time`} className="text-sm text-gray-600 mb-2 block">
                    Time Spent Today
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`${pillar.id}-time`}
                      type="number"
                      step="0.5"
                      placeholder="0"
                      value={pillar.time}
                      onChange={(e) => updatePillarTime(pillar.id, e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">hours</span>
                  </div>
                </div>

                {/* Quality Rating */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-gray-600">Quality of Time</Label>
                    <span className="text-sm font-semibold text-blue-600">{pillar.quality}/10</span>
                  </div>
                  <Slider
                    value={[pillar.quality]}
                    onValueChange={(value) => updatePillarQuality(pillar.id, value[0])}
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
              </Card>
            ))}
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
            Save & Continue
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