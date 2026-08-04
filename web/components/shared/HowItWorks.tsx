import { HOW_IT_WORKS } from "@/content/site";

export function HowItWorks() {
  return (
    <section className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How It Works</h2>

        <div className="mt-12 relative">
          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-5 hidden md:block">
            <div className="mx-auto max-w-4xl border-t-2 border-dashed border-accent/30" />
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg shadow-accent/25">
                  {step.step}
                </span>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted/80">{step.description}</p>
                  <p className="mt-4 text-sm font-semibold text-accent">{step.highlight}</p>
                </div>

                {/* Arrow between steps (except last) */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+2rem)] right-0">
                    <svg className="h-4 w-4 text-accent/40 absolute -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
