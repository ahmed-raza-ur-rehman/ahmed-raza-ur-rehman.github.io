import { Hero } from "./sections/Hero"
import { ProjectScrollytell } from "./sections/ProjectScrollytell"
import { SkillsConstellation } from "./sections/SkillsConstellation"
import { EngineeringFlow } from "./sections/EngineeringFlow"
import { Testimonials } from "./sections/Testimonials"
import { FAQ } from "./sections/FAQ"
import { Footer } from "./sections/Footer"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ProjectScrollytell />
      <SkillsConstellation />
      <EngineeringFlow />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
