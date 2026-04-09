import type { ComponentType, SVGProps } from 'react'
import { IconTelegram, IconGitHub, IconLinkedIn, IconX, IconYouTube } from '@/components/social-brand-icons'
import { TELEGRAM_LINK, TELEGRAM_LINK_LABEL } from '@/data/community'

/** Social links: Zero to Agent Telegram plus official Vercel profiles. Shared by SocialDiscovery and footer icons. */
export const VERCEL_SOCIAL_PROFILES: readonly {
  href: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}[] = [
  { href: TELEGRAM_LINK, label: TELEGRAM_LINK_LABEL, Icon: IconTelegram },
  { href: 'https://x.com/vercel', label: 'Vercel on X', Icon: IconX },
  { href: 'https://www.linkedin.com/company/vercel/', label: 'Vercel on LinkedIn', Icon: IconLinkedIn },
  { href: 'https://www.youtube.com/c/VercelHQ', label: 'Vercel on YouTube', Icon: IconYouTube },
  { href: 'https://github.com/vercel', label: 'Vercel on GitHub', Icon: IconGitHub },
]
