import { RouterProvider } from "react-router"
import { ReactLenis } from "lenis/react"
import { router } from "./router"
import { AppErrorBoundary } from "./components/site/AppErrorBoundary"
import { useReducedMotion } from "motion/react"

const lenisOptions = {
  anchors: true,
  lerp: 0.085,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  syncTouch: false,
}

const App = () => {
  const reduce = useReducedMotion()
  return (
  <AppErrorBoundary>
    {!reduce && <ReactLenis root options={lenisOptions} />}
    <RouterProvider router={router} />
  </AppErrorBoundary>
  )
}

export default App
