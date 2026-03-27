import Image from 'next/image';

const ICONS: Record<string, { src: string; label: string }> = {
  github:   { src: '/socials/github.png',   label: 'GitHub' },
  linkedin: { src: '/socials/linkedin.png', label: 'LinkedIn' },
  x:        { src: '/socials/x.jpg',        label: 'X' },
  telegram: { src: '/socials/telegram.webp', label: 'Telegram' },
  discord:  { src: '/socials/discord.webp', label: 'Discord' },
}

interface SocialLinksProps {
  github?: string | null
  linkedin?: string | null
  x?: string | null
  telegram?: string | null
  discord?: string | null
  website?: string | null
  size?: number
}

export default function SocialLinks({ github, linkedin, x, telegram, discord, website, size = 16 }: SocialLinksProps) {
  const links = [
    { key: 'github',   href: github },
    { key: 'linkedin', href: linkedin },
    { key: 'x',        href: x },
    { key: 'telegram', href: telegram },
    { key: 'discord',  href: discord },
  ].filter((l) => l.href);

  return (
    <div className="flex items-center gap-2">
      {links.map(({ key, href }) => {
        const icon = ICONS[key];
        return (
          <a
            key={key}
            href={href!}
            target="_blank"
            rel="noopener noreferrer"
            title={icon.label}
            className="opacity-40 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
          >
            <Image
              src={icon.src}
              alt={icon.label}
              width={size}
              height={size}
              className="object-contain"
            />
          </a>
        );
      })}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
          className="font-mono text-[9px] text-outline/50 hover:text-primary transition-colors uppercase tracking-widest"
        >
          WEB
        </a>
      )}
    </div>
  );
}
