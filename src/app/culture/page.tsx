'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function CulturePage() {
  const { language } = useLanguage();
  const t = content[language].culture;

  return (
    <AnimatedBackground variant="particles">
      <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        {/* Cypher overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_10%,rgba(0,240,255,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,240,255,0.08),transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background:linear-gradient(to_right,rgba(0,240,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(180deg,transparent_0px,transparent_6px,rgba(168,85,247,0.25)_7px,transparent_8px)]" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h1 className="text-center text-5xl md:text-6xl font-bold mb-4 text-glow-purple">
              {t.title}
            </h1>
            <p className="text-center text-xl md:text-2xl text-cyber-white/85 max-w-4xl mx-auto">
              {t.description}
            </p>

            <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-cyber-blue/25 bg-black/45 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs tracking-wider text-cyber-blue/70">
                <span>{language === 'en' ? 'status: online' : 'estado: online'}</span>
                <span>{language === 'en' ? 'mode: cypher' : 'modo: cypher'}</span>
                <span>innovation_by_default=true</span>
              </div>
              <div className="mt-3 font-mono text-xs text-gray-400 leading-relaxed">
                {language === 'en'
                  ? 'We treat culture like an executable protocol: repeatable behaviors, clear trade-offs, and a commitment to privacy, openness, and shipping frontier technology.'
                  : 'Tratamos la cultura como un protocolo ejecutable: comportamientos repetibles, trade-offs claros y un compromiso con privacidad, apertura y shipping de tecnología de frontera.'}
              </div>
            </div>
          </motion.div>

          {/* Values as sections */}
          <div className="space-y-6">
            {t.values.map((value: any, idx: number) => {
              const hex = (idx + 1).toString(16).padStart(2, '0');
              const details: string[] | undefined = value.details;

              return (
                <motion.section
                  key={value.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 + idx * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-cyber-blue/20 bg-black/40"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:radial-gradient(circle_at_20%_10%,rgba(0,240,255,0.10),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.10),transparent_40%)]" />
                  <div className="relative p-7 md:p-9">
                    <div className="flex items-start gap-6">
                      <div className="hidden sm:block flex-shrink-0">
                        <div className="font-mono text-xs tracking-widest text-cyber-blue/60">
                          {language === 'en' ? 'VALUE' : 'VALOR'}
                        </div>
                        <div className="mt-2 font-mono text-2xl text-cyber-blue">
                          {`0x${hex}`}
                        </div>
                        <div className="mt-3 h-px w-14 bg-gradient-to-r from-cyber-blue/60 to-transparent" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="sm:hidden font-mono text-xs tracking-widest text-cyber-blue/60">
                            {`0x${hex}`}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-cyber-white text-glow-blue">
                            {value.title}
                          </h2>
                        </div>
                        <p className="text-gray-200/90 text-lg leading-relaxed">
                          {value.description}
                        </p>

                        {details?.length ? (
                          <div className="mt-6 rounded-xl border border-purple-500/25 bg-black/45 px-5 py-4">
                            <div className="font-mono text-xs tracking-widest text-purple-300/80 mb-3">
                              {language === 'en' ? 'DEFAULT_BEHAVIORS' : 'COMPORTAMIENTOS_POR_DEFECTO'}
                            </div>
                            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                              {details.map((item) => (
                                <li key={item} className="flex gap-3">
                                  <span className="font-mono text-cyber-blue/70">{'>'}</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

