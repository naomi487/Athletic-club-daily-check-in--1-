import { createBrowserRouter, Outlet } from "react-router";
import { HomePage } from "./pages/HomePage";
import { VitalsByVideo } from "./pages/VitalsByVideo";
import { CheckInHome } from "./pages/CheckInHome";
import { PhysiologicalMetrics } from "./pages/PhysiologicalMetrics";
import { EmotionalPillars } from "./pages/EmotionalPillars";
import { AthleticData } from "./pages/AthleticData";
import { CheckInComplete } from "./pages/CheckInComplete";
import Navbar from "./components/Navbar";

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: "vitals", Component: VitalsByVideo },
      { path: "check-in", Component: CheckInHome },
      { path: "physiological", Component: PhysiologicalMetrics },
      { path: "emotional", Component: EmotionalPillars },
      { path: "athletic", Component: AthleticData },
      { path: "complete", Component: CheckInComplete },
    ],
  },
]);