import type { ComponentType, SVGProps } from 'react'
import { IconDiscord, IconGitHub, IconLinkedIn, IconX } from '@/components/social-brand-icons'
import { DISCORD_INVITE_URL, DISCORD_LINK_LABEL } from '@/data/community'

/** Social links: Zero to Agent Discord plus personal profiles. Shared by SocialDiscovery and footer icons. */
export const VERCEL_SOCIAL_PROFILES: readonly {
  href: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}[] = [
  { href: DISCORD_INVITE_URL, label: DISCORD_LINK_LABEL, Icon: IconDiscord },
  { href: 'https://x.com/AbdurhamanNur', label: 'AbdurhamanNur on X', Icon: IconX },
  { href: 'https://www.linkedin.com/in/abdurhaman-nur/', label: 'Abdurhaman Nur on LinkedIn', Icon: IconLinkedIn },
  { href: 'https://github.com/abdunur-dev', label: 'abdunur-dev on GitHub', Icon: IconGitHub },
]
