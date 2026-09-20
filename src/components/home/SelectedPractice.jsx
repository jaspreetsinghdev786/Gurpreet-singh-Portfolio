import { Link } from "react-router"
import { ArrowUpRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Tilt } from "../ui/Tilt"
import { Photo } from "../ui/photo"
import { workCategories } from "../../content/work"
export const SelectedPractice = () => <section id="selected-practice" className="selected-practice">
 <Reveal className="practice-heading" variant="clip"><div><p className="studio-eyebrow">01 / THE COLLECTION</p><h2>Many forms.<br/><em>One enduring curiosity.</em></h2></div><Link to="/work">View all work <ArrowUpRight size={20}/></Link></Reveal>
 <div className="practice-cards">{[workCategories[0],workCategories[1],workCategories[3]].map((item,index)=><Tilt key={item.slug} className="practice-card"><Link to={`/work/${item.slug}`}><RevealImage variant={["rise", "tilt-left", "wipe-right"][index]} delay={index*.1} className="practice-image"><Photo id={item.photo.id} alt={item.photo.alt} width={index === 0 ? 1600 : 700} sizes={index === 0 ? "(max-width:760px) 90vw,60vw" : "(max-width:760px) 90vw,28vw"} className="h-full w-full object-cover"/></RevealImage><div className="practice-card-caption"><span>0{index+1}</span><h3>{item.title}</h3><ArrowUpRight size={22}/></div><p>{item.desc}</p></Link></Tilt>)}</div>
</section>
