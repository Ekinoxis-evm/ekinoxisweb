'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-black-light border-t border-cyber-blue/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-cyber-blue text-glow mb-4">EKINOXIS</h3>
            <p className="text-gray-400 text-sm">{t.hero.subtitle}</p>
          </div>

          {/* USA Address */}
          <div>
            <h4 className="text-cyber-blue font-bold mb-3">United States</h4>
            <p className="text-gray-400 text-sm whitespace-pre-line mb-2">
              {t.footer.usa.address}
            </p>
            <a href="https://wa.me/13055041248" className="text-cyber-blue hover:text-glow transition-colors text-sm">
              +1 (305) 504-1248
            </a>
            <br />
            <a href="mailto:hello@ekinoxis.com" className="text-cyber-blue hover:text-glow transition-colors text-sm">
              hello@ekinoxis.com
            </a>
          </div>

          {/* Colombia Address */}
          <div>
            <h4 className="text-cyber-purple font-bold mb-3">Colombia</h4>
            <p className="text-gray-400 text-sm whitespace-pre-line mb-2">
              {t.footer.colombia.address}
            </p>
            <a href="https://wa.me/573023721435" className="text-cyber-purple hover:text-glow-purple transition-colors text-sm">
              +57 302 3721435
            </a>
            <br />
            <a href="mailto:hola@ekinoxis.com" className="text-cyber-purple hover:text-glow-purple transition-colors text-sm">
              hola@ekinoxis.com
            </a>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-cyber-purple font-bold mb-4">Socials</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={t.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-cyber-blue/30 flex items-center justify-center hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all group"
              >
                <Image
                  src="/socials/x.jpg"
                  alt="X / Twitter"
                  width={20}
                  height={20}
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
              <a
                href={t.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-cyber-purple/30 flex items-center justify-center hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all group"
              >
                <Image
                  src="/socials/instagram.webp"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
              <a
                href={t.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-cyber-blue/30 flex items-center justify-center hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all group"
              >
                <Image
                  src="/socials/telegram.webp"
                  alt="Telegram"
                  width={20}
                  height={20}
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
              <a
                href={t.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-cyber-purple/30 flex items-center justify-center hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all group"
              >
                <Image
                  src="/socials/discord.webp"
                  alt="Discord"
                  width={20}
                  height={20}
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
              <a
                href={t.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-cyber-blue/30 flex items-center justify-center hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all group"
              >
                <Image
                  src="/socials/github.png"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyber-blue/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Ekinoxis. All rights reserved. Innovation without frontiers.
          </p>
        </div>
      </div>
    </footer>
  );
}
