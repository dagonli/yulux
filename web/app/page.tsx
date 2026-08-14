import { HeroSection } from "@/components/home/HeroSection";
import { ProductFinder } from "@/components/home/ProductFinder";
import { CraftsmanshipLab } from "@/components/home/CraftsmanshipLab";
import { RealWorldProjects } from "@/components/home/RealWorldProjects";
import { YuluxAdvantage } from "@/components/shared/YuluxAdvantage";
import { FAQ } from "@/components/shared/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, creativeWorksItemListSchema } from "@/lib/schema";
import { HOME_FAQ, REAL_WORLD_PROJECTS } from "@/content/home";

export default function HomePage() {
  const projectList = REAL_WORLD_PROJECTS.projects.map((p, i) => ({
    name: p.name,
    image: p.image,
    description: `${p.craft} for ${p.name}, ${p.location}.`,
    position: i + 1,
  }));

  return (
    <>
      <JsonLd data={[faqSchema(HOME_FAQ.items), creativeWorksItemListSchema(projectList)]} />
      <HeroSection />
      <ProductFinder />
      <CraftsmanshipLab />
      <RealWorldProjects />
      <YuluxAdvantage />
      <FAQ h2={HOME_FAQ.h2} items={HOME_FAQ.items} />
      <FinalCTA />
    </>
  );
}
