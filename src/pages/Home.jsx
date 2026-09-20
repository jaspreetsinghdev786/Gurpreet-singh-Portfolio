import { ScrollJourney } from "../components/home/ScrollJourney"
import { SelectedPractice } from "../components/home/SelectedPractice"
import { Seo } from "../components/site/Seo"
import { Hero } from "../components/home/Hero"
import { ArchiveStrip } from "../components/home/ArchiveStrip"
import { Stats } from "../components/home/Stats"
import { Intro } from "../components/home/Intro"
import { FeaturedWork } from "../components/home/FeaturedWork"
import { Essay } from "../components/home/Essay"
import { Manifesto } from "../components/home/Manifesto"
import { Practice } from "../components/home/Practice"
import { Record } from "../components/home/Record"
import { Invitation } from "../components/home/Invitation"
import { ImageCollections, ExhibitionCollection } from "../components/home/ImageCollections"
import { StoryDisclosure } from "../components/home/StoryDisclosure"

/** A clear primary narrative, with deeper archive chapters available on demand. */
export const Home = () => (
  <div className="home-content">
    <Seo
      description="Gurpreet Singh, Gurpreet Artist Bathinda: painter, art educator and researcher. Portraiture, historical and cultural painting, photography and Punjab’s visual memory."
      path="/"
    />
    <Hero />
    <nav className="home-chapters" aria-label="Explore this page">
      <a href="#about"><span>01</span> THE ARTIST</a>
      <a href="#selected-practice"><span>02</span> SELECTED WORK</a>
      <a href="#record"><span>03</span> THE JOURNEY</a>
      <a href="#collections"><span>04</span> COLLECTIONS</a>
    </nav>
    <Intro />
    <SelectedPractice />
    <Manifesto />
    <Stats />
    <Record />
    <ImageCollections />
    <section className="deeper-stories" aria-labelledby="deeper-stories-title">
      <div className="editorial-container">
        <p className="editorial-eyebrow">Further reading / From the personal archive</p>
        <h2 id="deeper-stories-title">Every image has more to tell.</h2>
        <StoryDisclosure number="01" title="People, places and their stories"><FeaturedWork /><Essay /></StoryDisclosure>
        <StoryDisclosure number="02" title="Inside the practice"><ScrollJourney /><Practice /></StoryDisclosure>
        <StoryDisclosure number="03" title="Exhibitions and recognition"><ExhibitionCollection /></StoryDisclosure>
        <StoryDisclosure number="04" title="The memory strip"><ArchiveStrip /></StoryDisclosure>
      </div>
    </section>
    <Invitation />
  </div>
)



