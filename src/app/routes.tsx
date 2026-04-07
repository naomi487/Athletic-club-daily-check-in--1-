import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { VitalsByVideo } from "./pages/VitalsByVideo";
import { CheckInHome } from "./pages/CheckInHome";
import { PhysiologicalMetrics } from "./pages/PhysiologicalMetrics";
import { EmotionalPillars } from "./pages/EmotionalPillars";
import { AthleticData } from "./pages/AthleticData";
import { CheckInComplete } from "./pages/CheckInComplete";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/vitals",
    Component: VitalsByVideo,
  },
  {
    path: "/check-in",
    Component: CheckInHome,
  },
  {
    path: "/physiological",
    Component: PhysiologicalMetrics,
  },
  {
    path: "/emotional",
    Component: EmotionalPillars,
  },
  {
    path: "/athletic",
    Component: AthleticData,
  },
  {
    path: "/complete",
    Component: CheckInComplete,
  },
]);