import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Target, Calendar, MapPin, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
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

type TrainingPlan = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  isEditing?: boolean;
};

type RaceTime = {
  id: string;
  distance: string;
  time: string;
  date: string;
  location: string;
  isEditing?: boolean;
};

type TrainingLocation = {
  id: string;
  name: string;
  type: string;
};

export function AthleticData() {
  const navigate = useNavigate();
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [longTermGoal, setLongTermGoal] = useState('');
  
  // Mock existing training plans (auto-populated)
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([
    {
      id: '1',
      name: 'Marathon Training - Week 8',
      description: '16-week marathon prep program',
      startDate: '2026-02-01',
    },
  ]);

  const [newPlan, setNewPlan] = useState({ name: '', description: '', startDate: '' });
  const [showAddPlan, setShowAddPlan] = useState(false);

  // Mock existing race times (auto-populated)
  const [raceTimes, setRaceTimes] = useState<RaceTime[]>([
    {
      id: '1',
      distance: 'Half Marathon',
      time: '1:45:32',
      date: '2025-11-15',
      location: 'Boston Marathon',
    },
    {
      id: '2',
      distance: '10K',
      time: '42:18',
      date: '2025-09-20',
      location: 'City Park Run',
    },
  ]);

  const [newRace, setNewRace] = useState({ distance: '', time: '', date: '', location: '' });
  const [showAddRace, setShowAddRace] = useState(false);

  // Training locations
  const [locations, setLocations] = useState<TrainingLocation[]>([
    { id: '1', name: 'LA Fitness - Downtown', type: 'Gym' },
    { id: '2', name: 'Griffith Park Trails', type: 'Outdoor' },
  ]);

  const [newLocation, setNewLocation] = useState('');

  // Training Plan Functions
  const deletePlan = (id: string) => {
    setTrainingPlans(trainingPlans.filter((p) => p.id !== id));
  };

  const startEditPlan = (id: string) => {
    setTrainingPlans(
      trainingPlans.map((p) => (p.id === id ? { ...p, isEditing: true } : { ...p, isEditing: false }))
    );
  };

  const savePlan = (id: string) => {
    setTrainingPlans(trainingPlans.map((p) => (p.id === id ? { ...p, isEditing: false } : p)));
  };

  const updatePlan = (id: string, field: keyof TrainingPlan, value: string) => {
    setTrainingPlans(trainingPlans.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addPlan = () => {
    if (newPlan.name && newPlan.startDate) {
      setTrainingPlans([
        ...trainingPlans,
        { ...newPlan, id: Date.now().toString() },
      ]);
      setNewPlan({ name: '', description: '', startDate: '' });
      setShowAddPlan(false);
    }
  };

  // Race Time Functions
  const deleteRace = (id: string) => {
    setRaceTimes(raceTimes.filter((r) => r.id !== id));
  };

  const startEditRace = (id: string) => {
    setRaceTimes(
      raceTimes.map((r) => (r.id === id ? { ...r, isEditing: true } : { ...r, isEditing: false }))
    );
  };

  const saveRace = (id: string) => {
    setRaceTimes(raceTimes.map((r) => (r.id === id ? { ...r, isEditing: false } : r)));
  };

  const updateRace = (id: string, field: keyof RaceTime, value: string) => {
    setRaceTimes(raceTimes.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRace = () => {
    if (newRace.distance && newRace.time && newRace.date) {
      setRaceTimes([
        ...raceTimes,
        { ...newRace, id: Date.now().toString() },
      ]);
      setNewRace({ distance: '', time: '', date: '', location: '' });
      setShowAddRace(false);
    }
  };

  // Location Functions
  const addLocation = () => {
    if (newLocation.trim()) {
      setLocations([
        ...locations,
        { id: Date.now().toString(), name: newLocation, type: 'Custom' },
      ]);
      setNewLocation('');
    }
  };

  const deleteLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  const handleSubmit = () => {
    navigate('/complete');
  };

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const confirmSkip = () => {
    setShowSkipDialog(false);
    navigate('/complete');
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
              <span className="text-xs text-black-600 font-medium"></span>
            </div>
            <h1 className="font-semibold text-lg">Athletic Profile</h1>
            <p className="text-sm text-gray-600">Goals, training & locations</p>
          </div>
        </div>
        <div className="h-1 bg-gray-200 rounded-full mt-3">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        <div className="space-y-6">
          {/* Goals Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold">Goals</h2>
            </div>

            <Card className="p-4 mb-3">
              <Label htmlFor="weekly-goal" className="text-sm font-medium mb-2 block">
                Weekly Goal
              </Label>
              <Textarea
                id="weekly-goal"
                placeholder="e.g., Complete 3 training runs and 2 strength sessions"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(e.target.value)}
                rows={2}
              />
            </Card>

            <Card className="p-4">
              <Label htmlFor="long-term" className="text-sm font-medium mb-2 block">
                Long-Term Goal (6+ months)
              </Label>
              <Textarea
                id="long-term"
                placeholder="e.g., Complete a marathon"
                value={longTermGoal}
                onChange={(e) => setLongTermGoal(e.target.value)}
                rows={2}
              />
            </Card>
          </div>

          {/* Training Plan Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Training Plans</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddPlan(!showAddPlan)}
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {/* Existing Training Plans */}
              {trainingPlans.map((plan) => (
                <Card key={plan.id} className="p-4">
                  {!plan.isEditing ? (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{plan.name}</h3>
                          <p className="text-xs text-gray-600 mb-1">{plan.description}</p>
                          <p className="text-xs text-gray-500">Started: {new Date(plan.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => startEditPlan(plan.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePlan(plan.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Plan Name</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Description</Label>
                        <Input
                          value={plan.description}
                          onChange={(e) => updatePlan(plan.id, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Start Date</Label>
                        <Input
                          type="date"
                          value={plan.startDate}
                          onChange={(e) => updatePlan(plan.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <Button size="sm" onClick={() => savePlan(plan.id)} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              ))}

              {/* Add New Plan Form */}
              {showAddPlan && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-medium text-sm mb-3">Add New Training Plan</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Plan Name</Label>
                      <Input
                        placeholder="e.g., Marathon Training"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Description</Label>
                      <Input
                        placeholder="e.g., 16-week program"
                        value={newPlan.description}
                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Start Date</Label>
                      <Input
                        type="date"
                        value={newPlan.startDate}
                        onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addPlan} className="flex-1">
                        Add Plan
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowAddPlan(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Historical Race Times */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Historical Race Times</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddRace(!showAddRace)}
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {/* Existing Race Times */}
              {raceTimes.map((race) => (
                <Card key={race.id} className="p-4">
                  {!race.isEditing ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-blue-600">{race.distance}</span>
                            <span className="text-sm">•</span>
                            <span className="font-medium">{race.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-0.5">{race.location}</p>
                          <p className="text-xs text-gray-500">{new Date(race.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => startEditRace(race.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRace(race.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Distance</Label>
                        <Input
                          placeholder="e.g., Marathon"
                          value={race.distance}
                          onChange={(e) => updateRace(race.id, 'distance', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Time</Label>
                        <Input
                          placeholder="e.g., 1:45:30"
                          value={race.time}
                          onChange={(e) => updateRace(race.id, 'time', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Location</Label>
                        <Input
                          placeholder="e.g., Boston Marathon"
                          value={race.location}
                          onChange={(e) => updateRace(race.id, 'location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Date</Label>
                        <Input
                          type="date"
                          value={race.date}
                          onChange={(e) => updateRace(race.id, 'date', e.target.value)}
                        />
                      </div>
                      <Button size="sm" onClick={() => saveRace(race.id)} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              ))}

              {/* Add New Race Form */}
              {showAddRace && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-medium text-sm mb-3">Add Race Time</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Distance</Label>
                      <Input
                        placeholder="e.g., 5K, 10K, Marathon"
                        value={newRace.distance}
                        onChange={(e) => setNewRace({ ...newRace, distance: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Time</Label>
                      <Input
                        placeholder="e.g., 1:45:30"
                        value={newRace.time}
                        onChange={(e) => setNewRace({ ...newRace, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Location</Label>
                      <Input
                        placeholder="e.g., Boston Marathon"
                        value={newRace.location}
                        onChange={(e) => setNewRace({ ...newRace, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 mb-1 block">Date</Label>
                      <Input
                        type="date"
                        value={newRace.date}
                        onChange={(e) => setNewRace({ ...newRace, date: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addRace} className="flex-1">
                        Add Race
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowAddRace(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Training Locations Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold">Current Training Locations</h2>
            </div>

            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Add your gym memberships, training facilities, or outdoor locations:
              </p>

              {/* Existing Locations */}
              <div className="space-y-2 mb-4">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.type}</p>
                    </div>
                    <button
                      onClick={() => deleteLocation(location.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Location */}
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., 24 Hour Fitness - Main St"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addLocation()}
                />
                <Button size="sm" onClick={addLocation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleSkip}>
            Skip
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            Complete Check-In
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