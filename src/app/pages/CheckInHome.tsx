import { useNavigate } from 'react-router';
import { CheckCircle2, Circle, ChevronRight, Camera, Activity, Scale, Target } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

type CheckInItem = {
  id: string;
  step: number;
  title: string;
  description: string;
  route: string;
  completed: boolean;
  icon: React.ReactNode;
};

export function CheckInHome() {
  const navigate = useNavigate();

  // In a real app, this would come from state management
  const checkInItems: CheckInItem[] = [
    {
      id: 'vitals',
      step: 1,
      title: 'Vitals by Video',
      description: 'Scan your vitals via camera',
      route: '/vitals',
      completed: true,
      icon: <Camera className="w-5 h-5" />,
    },
    {
      id: 'physiological',
      step: 2,
      title: 'Physiological Check-In',
      description: 'Import or enter recovery metrics',
      route: '/physiological',
      completed: false,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      id: 'balance',
      step: 3,
      title: 'Balance Check',
      description: 'Assess your life pillars balance',
      route: '/emotional',
      completed: false,
      icon: <Scale className="w-5 h-5" />,
    },
    // {
    //   id: 'athletic',
    //   step: 4,
    //   title: 'Athletic Profile',
    //   description: 'Goals, training plans, locations',
    //   route: '/athletic',
    //   completed: false,
    //   icon: <Target className="w-5 h-5" />,
    // },
  ];

  const completedCount = checkInItems.filter((item) => item.completed).length;
  const totalCount = checkInItems.length;
  const progress = (completedCount / totalCount) * 100;
  const nextIncompleteItem = checkInItems.find((item) => !item.completed);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 py-6 relative overflow-hidden">
        <h1 className="font-semibold text-lg">Daily Check-In</h1>
        <p className="text-sm text-gray-600">
          {completedCount} of {totalCount} steps completed
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24">
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Complete all steps to unlock personalized AI recommendations
            </p>
          </Card>

          {/* Next Step Callout */}
          {nextIncompleteItem && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {nextIncompleteItem.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-black-600 font-medium mb-1">NEXT STEP</p>
                  <h3 className="font-semibold text-sm mb-1">{nextIncompleteItem.title}</h3>
                  <p className="text-xs text-gray-600">{nextIncompleteItem.description}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Check-In Items */}
          <div className="space-y-3">
            <h2 className="font-semibold text-sm text-gray-700 px-1">Your Check-In Steps</h2>
            {checkInItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  !item.completed ? 'border-blue-200' : ''
                }`}
                onClick={() => navigate(item.route)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">{item.step}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-gray-500 font-medium">STEP {item.step}</span>
                    </div>
                    <h3 className="font-medium text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-gray-100 border-gray-200">
            <p className="text-xs text-gray-700">
              <strong>Why complete all steps?</strong>
              <br />
              Our AI analyzes your complete profile to provide personalized training recommendations, 
              recovery insights, and daily activity suggestions tailored to your goals.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}