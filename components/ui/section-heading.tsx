interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  centered?: boolean
  /** Sets `id` on the `<h2>` for `aria-labelledby` / in-page links. */
  id?: string
}

export function SectionHeading({ label, title, description, centered = false, id }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
        {label}
      </p>
      <h2
        id={id}
        className="text-[26px] sm:text-[32px] md:text-[44px] font-bold text-[var(--text)] leading-[1.12] sm:leading-[1.15] tracking-[-0.03em]"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-secondary)] max-w-2xl tracking-[-0.01em]"
           style={{ marginLeft: centered ? 'auto' : undefined, marginRight: centered ? 'auto' : undefined }}>
          {description}
        </p>
      )}
    </div>
  )
}
