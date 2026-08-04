import { HeroSection } from "@/components/home/HeroSection";
import { ProductFinder } from "@/components/home/ProductFinder";
import { CraftsmanshipLab } from "@/components/home/CraftsmanshipLab";
import { RealWorldProjects } from "@/components/home/RealWorldProjects";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { YuluxAdvantage } from "@/components/shared/YuluxAdvantage";
import { FAQ } from "@/components/shared/FAQ";
import { ExpertFAQ } from "@/components/shared/ExpertFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, creativeWorksItemListSchema } from "@/lib/schema";
import { HOME_FAQ, HOME_TRUST, REAL_WORLD_PROJECTS } from "@/content/home";

export default function HomePage() {
  const projectList = REAL_WORLD_PROJECTS.projects.map((p, i) => ({
    name: p.name,
    image: p.image,
    description: `${p.craft} for ${p.name}, ${p.location}.`,
    position: i + 1,
  }));

  const expertFaqItems = [
    {
      question: "What is the typical lead time for a custom project?",
      answer: "Our streamlined process ensures production in 3-5 business days. With global express shipping, most clients receive their custom signs within 10-14 days from design approval.",
    },
    {
      question: "Is professional installation required?",
      answer: 'No. Our signs are designed for "Plug-and-Play" simplicity. Each unit comes with a 1:1 installation template and a complete mounting kit (screws or hanging wires) for effortless setup.',
    },
    {
      question: "Can you provide weatherproofing for outdoor environments?",
      answer: 'Absolutely. We offer IP67-rated waterproofing for all our neon and channel letter products. Simply specify "Outdoor Use" during customization or in your inquiry.',
    },
    {
      question: "Do you offer bulk discounts for corporate or wholesale orders?",
      answer: "Yes. We specialize in B2B partnerships and offer competitive tiered pricing for bulk orders, franchise rollouts, and wholesale distributions.",
    },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(HOME_FAQ.items), creativeWorksItemListSchema(projectList), faqSchema(expertFaqItems)]} />
      <HeroSection />
      <ProductFinder />
      <CraftsmanshipLab />
      <RealWorldProjects />
      <TrustBadges h2={HOME_TRUST.h2} seoText={HOME_TRUST.seoText} />
      <YuluxAdvantage />
      <FAQ h2={HOME_FAQ.h2} items={HOME_FAQ.items} />
      <ExpertFAQ />
      <FinalCTA />
    </>
  );
}
