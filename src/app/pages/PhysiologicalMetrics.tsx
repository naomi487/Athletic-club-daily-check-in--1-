import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, AlertCircle, Download, Plus, Minus } from 'lucide-react';
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

const BODY_PARTS = [
  'Calves',
  'Hamstrings',
  'Thighs',
  'Glutes',
  'Hips',
  'Abs',
  'Back',
  'Shoulders',
  'Neck',
  'Forearms',
  'Chest',
];

export function PhysiologicalMetrics() {
  const navigate = useNavigate();
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [formData, setFormData] = useState({
    hrv: '',
    sleep: '',
    energyScore: 5,
    muscularSoreness: 5,
    jointPain: 5,
    nervePain: 5,
    foamRollingSessions: 0,
    massageGunSessions: 0,
  });
  const [stretchedBodyParts, setStretchedBodyParts] = useState<Set<string>>(new Set());

  const handleSubmit = () => {
    // Save data and navigate to next section
    navigate('/check-in');
  };

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const confirmSkip = () => {
    setShowSkipDialog(false);
    navigate('/check-in');
  };

  const updateSlider = (field: string, value: number[]) => {
    setFormData({ ...formData, [field]: value[0] });
  };

  const handleImportHealthData = () => {
    // In a real app, this would trigger health data import (Apple Health, Google Fit, etc.)
    alert('Import health data functionality');
  };

  const incrementSessions = (field: 'foamRollingSessions' | 'massageGunSessions') => {
    setFormData({ ...formData, [field]: formData[field] + 1 });
  };

  const decrementSessions = (field: 'foamRollingSessions' | 'massageGunSessions') => {
    setFormData({ ...formData, [field]: Math.max(0, formData[field] - 1) });
  };

  const toggleBodyPart = (bodyPart: string) => {
    const newSet = new Set(stretchedBodyParts);
    if (newSet.has(bodyPart)) {
      newSet.delete(bodyPart);
    } else {
      newSet.add(bodyPart);
    }
    setStretchedBodyParts(newSet);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 py-6 relative overflow-hidden g-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/check-in')} className="p-1 -ml-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-black-600 font-medium">STEP 2</span>
            </div>
            <h1 className="font-semibold text-lg">Physiological Check-In</h1>
            <p className="text-sm text-gray-600">Import or enter your metrics</p>
          </div>
        </div>
        <div className="h-1 bg-gray-200 rounded-full mt-3">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        <div className="space-y-6">
          {/* Import Health Data Option */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3 mb-3">
              <Download className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">Import Health Data</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Automatically sync your metrics from Apple Health, Google Fit, or other devices
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportHealthData}
              className="w-full bg-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Import from Device
            </Button>
          </Card>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500 font-medium">OR ENTER MANUALLY</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Overall Energy Score */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label className="text-sm font-medium">Overall Energy Score</Label>
              <span className="text-sm font-semibold text-blue-600">{formData.energyScore}/10</span>
            </div>
            <Slider
              value={[formData.energyScore]}
              onValueChange={(value) => updateSlider('energyScore', value)}
              min={0}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Completely drained</span>
              <span>Fully energized</span>
            </div>
          </Card>

          {/* HRV */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label htmlFor="hrv" className="text-sm font-medium">
                Heart Rate Variability (HRV)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="hrv"
                type="number"
                placeholder="Enter HRV"
                value={formData.hrv}
                onChange={(e) => setFormData({ ...formData, hrv: e.target.value })}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">ms</span>
            </div>
          </Card>

          {/* Sleep */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label htmlFor="sleep" className="text-sm font-medium">
                Sleep Duration
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="Enter hours"
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">hours</span>
            </div>
          </Card>

          {/* Muscular Soreness */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label className="text-sm font-medium">Muscular Soreness Level</Label>
              <span className="text-sm font-semibold text-blue-600">{formData.muscularSoreness}/10</span>
            </div>
            <Slider
              value={[formData.muscularSoreness]}
              onValueChange={(value) => updateSlider('muscularSoreness', value)}
              min={0}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>No soreness</span>
              <span>Extremely sore</span>
            </div>
          </Card>

          {/* Joint Pain */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label className="text-sm font-medium">Joint Pain Level</Label>
              <span className="text-sm font-semibold text-blue-600">{formData.jointPain}/10</span>
            </div>
            <Slider
              value={[formData.jointPain]}
              onValueChange={(value) => updateSlider('jointPain', value)}
              min={0}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>No pain</span>
              <span>Severe pain</span>
            </div>
          </Card>

          {/* Nerve Pain */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Label className="text-sm font-medium">Nerve Pain Level</Label>
              <span className="text-sm font-semibold text-blue-600">{formData.nervePain}/10</span>
            </div>
            <Slider
              value={[formData.nervePain]}
              onValueChange={(value) => updateSlider('nervePain', value)}
              min={0}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>No pain</span>
              <span>Severe pain</span>
            </div>
          </Card>

          {/* Foam Rolling */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Label className="text-sm font-medium">Foam Rolling Sessions</Label>
                <p className="text-xs text-gray-500 mt-1">Track each session today</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => decrementSessions('foamRollingSessions')}
                  className="h-8 w-8 p-0"
                  disabled={formData.foamRollingSessions === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold text-blue-600 min-w-[2rem] text-center">
                  {formData.foamRollingSessions}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => incrementSessions('foamRollingSessions')}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Massage Gun */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Label className="text-sm font-medium">Massage Gun Sessions</Label>
                <p className="text-xs text-gray-500 mt-1">Track each session today</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => decrementSessions('massageGunSessions')}
                  className="h-8 w-8 p-0"
                  disabled={formData.massageGunSessions === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold text-blue-600 min-w-[2rem] text-center">
                  {formData.massageGunSessions}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => incrementSessions('massageGunSessions')}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Stretching */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Label className="text-sm font-medium">Click the areas you've stretched today</Label>
                <p className="text-xs text-gray-500 mt-1">
                  {stretchedBodyParts.size} of {BODY_PARTS.length} areas selected
                </p>
              </div>
              {stretchedBodyParts.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStretchedBodyParts(new Set())}
                  className="text-xs h-auto py-1 px-2"
                >
                  Clear All
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BODY_PARTS.map((bodyPart) => {
                const isSelected = stretchedBodyParts.has(bodyPart);
                return (
                  <button
                    key={bodyPart}
                    onClick={() => toggleBodyPart(bodyPart)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {bodyPart}
                  </button>
                );
              })}
            </div>
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