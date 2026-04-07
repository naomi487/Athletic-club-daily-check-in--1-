import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Heart, Activity, Wind, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

export function VitalsByVideo() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [vitals, setVitals] = useState({
    heartRate: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
    breathingRate: 0,
  });

  useEffect(() => {
    if (isScanning && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isScanning && countdown === 0) {
      // Simulate vital signs results
      setVitals({
        heartRate: Math.floor(Math.random() * (80 - 60) + 60),
        bloodPressure: {
          systolic: Math.floor(Math.random() * (130 - 110) + 110),
          diastolic: Math.floor(Math.random() * (85 - 70) + 70),
        },
        breathingRate: Math.floor(Math.random() * (18 - 12) + 12),
      });
      setIsScanning(false);
      setShowResults(true);
    }
  }, [isScanning, countdown]);

  const startScan = () => {
    setIsScanning(true);
    setCountdown(30);
    setShowResults(false);
  };

  const handleContinue = () => {
    navigate('/check-in');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 py-6 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/')} className="p-1 -ml-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-black-600 font-medium">STEP 1</span>
            </div>
            <h1 className="font-semibold text-lg">Vitals by Video</h1>
            <p className="text-sm text-gray-600">30-second vital signs scan</p>
          </div>
        </div>
        <div className="h-1 bg-gray-200 rounded-full mt-3">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-24">
        {!isScanning && !showResults && (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="font-semibold text-lg mb-2">Video Vitals Scan</h2>
              <p className="text-gray-600 text-sm mb-4">
                Position your face in front of the camera for 30 seconds to measure your vital signs.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-600 mb-2">We'll measure:</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Heart Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Blood Pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">Breathing Rate</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-900">
                <strong>Tips for best results:</strong>
                <br />• Sit in a well-lit area
                <br />• Keep your face centered in frame
                <br />• Remain still during the scan
              </p>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="space-y-6">
            <Card className="aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl m-8 border-dashed animate-pulse" />
              <div className="text-center z-10">
                <div className="text-6xl font-bold text-white mb-2">{countdown}</div>
                <p className="text-white text-sm">Scanning...</p>
              </div>
            </Card>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-600">{30 - countdown} / 30s</span>
              </div>
              <Progress value={((30 - countdown) / 30) * 100} />
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-semibold text-lg">Scan Complete</h2>
              <p className="text-gray-600 text-sm">Your vitals have been recorded</p>
            </div>

            <div className="space-y-3">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Heart Rate</p>
                      <p className="font-semibold">{vitals.heartRate} BPM</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Pressure</p>
                      <p className="font-semibold">
                        {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic} mmHg
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Wind className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Breathing Rate</p>
                      <p className="font-semibold">{vitals.breathingRate} breaths/min</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Normal</span>
                </div>
              </Card>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={startScan}
            >
              Take Another Reading
            </Button>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        {!isScanning && !showResults && (
          <Button className="w-full" onClick={startScan}>
            Start Scan
          </Button>
        )}
        {showResults && (
          <Button className="w-full" onClick={handleContinue}>
            Continue with Check-In
          </Button>
        )}
      </div>
    </div>
  );
}