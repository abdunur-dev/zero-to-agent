import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'
import { Accordion } from './ui/accordion'
import { faqItems } from '@/data/faq'
import { DISCORD_INVITE_URL, DISCORD_LINK_LABEL } from '@/data/community'

export function FAQ() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="FAQ"
            title="Common questions."
            description="Things people wonder about before their first event, and during."
            centered
          />
        </SectionReveal>

        <SectionReveal>
          <Accordion items={faqItems} />
        </SectionReveal>

        {/* Contact note */}
        <SectionReveal>
          <div className="mt-12 text-center">
            <p className="text-[13px] text-[var(--text-secondary)]">
              Still have questions?{' '}
              <a
                href="https://community.vercel.com/host/zero-to-agent-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Visit the Zero to Agent hub
              </a>{' '}
              or ask in the{' '}
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {DISCORD_LINK_LABEL}
              </a>
              .
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
