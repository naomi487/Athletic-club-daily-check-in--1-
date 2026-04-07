import { useNavigate } from 'react-router';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function CheckInComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Content */}
      <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Check-In Complete!</h1>
            <p className="text-gray-600">
              Great job completing your daily check-in. You now have full access to the app.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="space-y-3">
            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Vitals Recorded</p>
                  <p className="text-xs text-gray-600">Heart rate, BP, breathing rate</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Recovery Metrics Logged</p>
                  <p className="text-xs text-gray-600">HRV, sleep, pain levels tracked</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Wellbeing Assessed</p>
                  <p className="text-xs text-gray-600">Life balance calculated</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Goals & Training Set</p>
                  <p className="text-xs text-gray-600">Athletic data updated</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-blue-100 border-blue-300">
            <p className="text-sm text-blue-900 text-center">
              <strong>Next Steps:</strong>
              <br />
              Access your personalized dashboard, training recommendations, and performance analytics.
            </p>
          </Card>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button className="w-full" onClick={() => navigate('/')}>
              View Dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/vitals')}
            >
              Start New Check-In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}