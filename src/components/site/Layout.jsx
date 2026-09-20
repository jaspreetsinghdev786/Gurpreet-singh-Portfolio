import { DepthProvider, useSceneMotion } from "./DepthProvider"
import { ScrollRestoration, useLocation, useNavigation, useOutlet } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import { SiteHeader } from "./SiteHeader"
import { SiteFooter } from "./SiteFooter"
import { PageTransition } from "./PageTransition"
import { NavigationTransition } from "./NavigationTransition"
import { CustomCursor } from "./CustomCursor"
import { OpeningSequence } from "./OpeningSequence"
import "./motion.css"
import "./atelier.css"
import "./editorial-system.css"
import "./image-layout.css"

const EASE = [0.22, 1, 0.36, 1]

export const Layout = () => {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const navigation = useNavigation()
  const reduce = useSceneMotion()

  return (
    <DepthProvider>
      <motion.div
        className="editorial-site min-h-screen bg-charcoal"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.85, ease: EASE }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-dark-text"
        >
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        <NavigationTransition />
        <OpeningSequence />
        <main id="main" aria-busy={navigation.state !== "idle"}>
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              {outlet}
            </PageTransition>
          </AnimatePresence>
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <CustomCursor />
      </motion.div>
    </DepthProvider>
  )
}
