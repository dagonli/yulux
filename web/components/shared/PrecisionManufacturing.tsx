type Step = {
  step: number;
  title: string;
  description: string;
  highlight?: boolean;
};

const STEPS: Step[] = [
  {
    step: 1,
    title: "Advanced Laser Cutting",
    description:
      "Achieving intricate designs and razor-sharp edges with sub-millimeter precision.",
  },
  {
    step: 2,
    title: "Expert Welding & Fabrication",
    description:
      "Our certified welders ensure robust structural integrity and seamless finishes.",
  },
  {
    step: 3,
    title: "Integrated LED Installation",
    description:
      "Each LED module is carefully positioned and wired for optimal brightness and uniform light distribution.",
  },
  {
    step: 4,
    title: "Rigorous 24-Hour Burn-In Test",
    description:
      "Every single letter is lit for 24 hours straight. We video-record the final test of YOUR sign and send it to you before crating.",
    highlight: true,
  },
];

export function PrecisionManufacturing() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Our Process: Where Precision Meets Passion
        </h2>

        <div className="mt-12 relative">
          {/* Horizontal timeline line */}
          <div className="absolute left-0 right-0 top-6 hidden md:block">
            <div className="mx-auto max-w-4xl border-t-2 border-dashed border-accent/30" />
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className={`relative flex flex-col items-center text-center rounded-xl p-6 ${
                  step.highlight
                    ? "border-2 border-accent bg-accent/5"
                    : "border border-card-border bg-card"
                }`}
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg shadow-accent/25">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                {step.highlight && (
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    Video Proof Included
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
