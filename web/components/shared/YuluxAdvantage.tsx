import { SmartImage } from "@/components/shared/SmartImage";

const ADVANTAGES = [
  {
    icon: "/images/icons/yulux_icon_quality.png",
    title: "Engineering-Grade Quality",
    description:
      "100% handcrafted using premium 12V flexible LED technology. CE & RoHS compliant, low-heat, and eco-friendly for maximum safety.",
  },
  {
    icon: "/images/icons/yulux_icon_shipping.png",
    title: "Global Express & Insured Shipping",
    description:
      'Fully insured worldwide delivery via DHL/FedEx/UPS. We provide a "Broken-on-arrival" instant replacement guarantee.',
  },
  {
    icon: "/images/icons/yulux_icon_response.png",
    title: "24-Hour Rapid Technical Response",
    description:
      "Our design team provides free professional mockups and detailed quotes within 24 hours for all custom logo inquiries.",
  },
  {
    icon: "/images/icons/yulux_icon_warranty.png",
    title: "2-Year Comprehensive Warranty",
    description:
      "Enjoy total peace of mind with our 2-year hassle-free warranty covering all indoor and outdoor signage components.",
  },
] as const;

export function YuluxAdvantage() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Why Industry Leaders Choose Yulux Signs</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <SmartImage
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
