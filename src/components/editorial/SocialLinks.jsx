import { motion } from "motion/react"
import { icons } from "../ui/icons"
import { socials } from "../../content/contact"
import { site } from "../../content/site"
import { useSceneMotion } from "../site/DepthProvider"

const listVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 9 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/** Only live social profiles render; their small marks enter in sequence. */
export const SocialLinks = ({ className = "", tone = "dark" }) => {
  const reduce = useSceneMotion()
  const live = socials.filter((social) => social.href)
  if (!live.length) return null

  return (
    <motion.ul
      className={"flex gap-5 " + className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "shown"}
      viewport={{ once: true, amount: 0.6 }}
      variants={listVariants}
    >
      {live.map(({ network, href, label }) => {
        const Icon = icons[network]
        return (
          <motion.li key={label} variants={itemVariants}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={site.name + " on " + label}
              className={"inline-flex transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light " + (
                tone === "light" ? "text-dark-text/50 hover:text-gold" : "text-ivory/45 hover:text-gold-light"
              )}
            >
              <Icon size={19} weight="light" aria-hidden="true" />
            </a>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
