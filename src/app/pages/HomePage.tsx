import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, ArrowRight, Activity, Scale, Target, Sun, Cloud, CloudRain, X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for HRV and Sleep
const healthData = [
  { date: 'Mon', hrv: 65, sleep: 7.5 },
  { date: 'Tue', hrv: 72, sleep: 8.0 },
  { date: 'Wed', hrv: 68, sleep: 6.5 },
  { date: 'Thu', hrv: 75, sleep: 7.8 },
  { date: 'Fri', hrv: 70, sleep: 7.2 },
  { date: 'Sat', hrv: 78, sleep: 8.5 },
  { date: 'Sun', hrv: 74, sleep: 8.0 },
];

type ScoreCircleProps = {
  score: number;
  maxScore: number;
  label: string;
  icon: React.ReactNode;
  color: string;
};

function ScoreCircle({ score, maxScore, label, icon, color }: ScoreCircleProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-600 mb-0.5">{icon}</div>
          <span className="text-lg font-bold">{score}</span>
          <span className="text-xs text-gray-500">/{maxScore}</span>
        </div>
      </div>
      <p className="text-xs text-gray-700 mt-2 text-center font-medium">{label}</p>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState('');
  const [showCombinedGraph, setShowCombinedGraph] = useState(false);
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [pillars, setPillars] = useState<string[]>([
    'Endurance Athlete',
    'Machine Learning Technician',
    'Dog Mom',
  ]);
  const [newPillar, setNewPillar] = useState('');

  const handleStartCheckIn = () => {
    navigate('/vitals');
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle chat message
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleQuickAction = () => {
    // Handle quick action (+ button)
    console.log('Quick action triggered');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 py-6 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white drop-shadow-md">Welcome, Athlete!</h1>
            <p className="text-sm text-white/90 mt-1">Let's optimize your performance today</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/athletic')}
              className="px-3 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors text-sm font-medium"
              aria-label="Open Athlete Profile"
            >
              Athlete Profile
            </button>
            <button
              onClick={() => setShowWeatherPopup(true)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Sun className="w-6 h-6 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Weather Popup */}
      {showWeatherPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6" onClick={() => setShowWeatherPopup(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg">Current Weather</h3>
              <button 
                onClick={() => setShowWeatherPopup(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sun className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold">72°F</div>
                <div className="text-gray-600">Sunny</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Feels Like</div>
                <div className="font-semibold">70°F</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Humidity</div>
                <div className="font-semibold">65%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Wind</div>
                <div className="font-semibold">8 mph</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">UV Index</div>
                <div className="font-semibold">6 (High)</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-900">
                <strong>Training Tip:</strong> Great weather for outdoor training! Stay hydrated and wear sunscreen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* Daily Check-In Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold mb-1">Daily Check-In</h2>
              <p className="text-sm text-blue-100">Complete your daily assessment</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <Button
            onClick={handleStartCheckIn}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium"
          >
            Start Check-In
          </Button>
        </Card>

        {/* Your Life Pillars (editable) */}
        {/* <Card className="p-6 bg-white border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Life Pillars</h3>
            <div className="text-sm text-gray-500">These are the areas we consider when computing Life Balance</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {pillars.map((p, idx) => (
                <div key={p} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border">
                  <span className="text-sm">{p}</span>
                  <button
                    onClick={() => setPillars((prev) => prev.filter((_, i) => i !== idx))}
                    className="text-xs text-red-500 hover:underline"
                    aria-label={`Delete ${p}`}
                  >
                    <span className="sr-only">Delete</span>
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Input
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                placeholder="Add a new pillar (e.g. Parent, Researcher)"
                className="flex-1"
              />
              <Button
                onClick={() => {
                  if (newPillar.trim()) {
                    setPillars((prev) => [...prev, newPillar.trim()]);
                    setNewPillar('');
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </Card> */}

        {/* Score Circles */}
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <h3 className="font-semibold mb-4">Your Scores</h3>
          <p className="text-sm text-gray-600 mb-3">
            You are an athlete, but we know other areas of your life are just as important. Your current pillars are: <strong>Endurance Athlete</strong>, <strong>Machine Learning Technician</strong>, and <strong>Dog Mom</strong>.
          </p>
          {/* Three life sub-scores that combine into Life Balance */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              {/* Sub-scores */}
              <ScoreCircle
                score={7.0}
                maxScore={10}
                label="Personal"
                icon={<Activity className="w-5 h-5" />}
                color="text-emerald-500"
              />
              <ScoreCircle
                score={6.5}
                maxScore={10}
                label="Athletic"
                icon={<Target className="w-5 h-5" />}
                color="text-pink-500"
              />
              <ScoreCircle
                score={6.0}
                maxScore={10}
                label="Work"
                icon={<Scale className="w-5 h-5" />}
                color="text-blue-500"
              />
            </div>

            {/* Equals sign */}
            <div className="text-2xl font-bold text-gray-500">=</div>

            {/* Total life balance (average of the three) */}
            {(() => {
              const personal = 7.0;
              const athletic = 6.5;
              const work = 6.0;
              const total = Number(((personal + athletic + work) / 3).toFixed(1));
              return (
                <ScoreCircle
                  score={total}
                  maxScore={10}
                  label="Life Balance"
                  icon={<Scale className="w-5 h-5" />}
                  color="text-blue-500"
                />
              );
            })()}
          </div>
        </Card>

        {/* HRV & Sleep Graph */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Health Trends</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="combined-toggle" className="text-xs text-gray-600 cursor-pointer">
                Combined
              </Label>
              <Switch
                id="combined-toggle"
                checked={showCombinedGraph}
                onCheckedChange={setShowCombinedGraph}
              />
            </div>
          </div>
          
          {showCombinedGraph ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                {/* Left Y axis for HRV (0-80, ticks every 20) */}
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                  domain={[0, 80]}
                  ticks={[0, 20, 40, 60, 80]}
                />
                {/* Right Y axis for Sleep (0-9, ticks every 1) */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                  domain={[0, 9]}
                  ticks={[0,1,2,3,4,5,6,7,8,9]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="line"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="hrv" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="HRV (ms)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  name="Sleep (hrs)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="space-y-6">
              {/* HRV Graph */}
              <div>
                <p className="text-xs text-gray-600 mb-2 font-medium">HRV (ms)</p>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11 }}
                      stroke="#888"
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      stroke="#888"
                      domain={[60, 80]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hrv" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Sleep Graph */}
              <div>
                <p className="text-xs text-gray-600 mb-2 font-medium">Sleep (hours)</p>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11 }}
                      stroke="#888"
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      stroke="#888"
                      domain={[6, 9]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </Card>

        {/* Upcoming Goals */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-700" />
            <h3 className="font-semibold">Upcoming Goals</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-white border border-green-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">Marathon Training - Week 8</p>
                  <p className="text-xs text-gray-600">16-week marathon prep program</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '50%' }} />
                </div>
                <span className="text-xs text-gray-600 font-medium">50%</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-green-200 rounded-lg">
              <p className="text-sm font-medium mb-1">Weekly Goal</p>
              <p className="text-xs text-gray-600">Complete 3 training runs and 2 strength sessions</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '60%' }} />
                </div>
                <span className="text-xs text-gray-600 font-medium">3/5</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 safe-area-bottom">
        <div className="flex items-center gap-3">
          <button
            onClick={handleQuickAction}
            className="w-10 h-10 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <Input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="ask about your training... or tap + for me"
              className="pr-12 bg-gray-50 border-gray-300"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!chatMessage.trim()}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}