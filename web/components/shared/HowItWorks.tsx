import { HOW_IT_WORKS } from "@/content/site";

export function HowItWorks() {
  return (
    <section className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How It Works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="relative rounded-xl border border-card-border bg-card p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
              <p className="mt-4 text-sm font-medium text-accent">{step.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
