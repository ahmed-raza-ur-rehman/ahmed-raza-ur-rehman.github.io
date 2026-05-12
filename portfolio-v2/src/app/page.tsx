import { Hero } from "./sections/Hero"
import { ProjectScrollytell } from "./sections/ProjectScrollytell"
import { SkillsConstellation } from "./sections/SkillsConstellation"
import { EngineeringFlow } from "./sections/EngineeringFlow"
import { CertificationsGallery } from "./sections/CertificationsGallery"
import { LinkedInActivity } from "./sections/LinkedInActivity"
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
      <CertificationsGallery />
      <LinkedInActivity />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
