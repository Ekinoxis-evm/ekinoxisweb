'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function ResearchPage() {
  const { language } = useLanguage();
  const t = content[language].research;

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto mb-4">
              {t.description}
            </p>
            <p className="text-lg text-cyber-purple/80 max-w-2xl mx-auto">
              {t.focus}
            </p>
          </motion.div>

          {/* Section 1: Frontier technologies we work with */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 border border-cyber-blue/30 rounded-2xl bg-black/40 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-blue">
              {language === 'en'
                ? 'Frontier technologies in our lab'
                : 'Tecnologías de frontera en nuestro laboratorio'}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl">
              {language === 'en'
                ? 'We don’t just read about new technology — we build with it. Our work combines artificial intelligence, applied cryptography, and blockchain to ship products and experiments that run on mainnet, not only in slides.'
                : 'No solo leemos sobre nuevas tecnologías, construimos con ellas. Nuestro trabajo combina inteligencia artificial, criptografía aplicada y blockchain para lanzar productos y experimentos que viven en mainnet, no solo en diapositivas.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-cyber-blue">AI & Agents</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Copilots and agents that help developers ship faster.</li>
                  <li>• Experimenting with LLMs for automation and support.</li>
                  <li>• Evaluating model safety, latency and costs in real use cases.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-cyber-blue">
                  {language === 'en' ? 'Applied Cryptography' : 'Criptografía aplicada'}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Identity and reputation systems resistant to Sybil attacks.</li>
                  <li>• Exploring zero-knowledge proofs and privacy‑preserving flows.</li>
                  <li>• Secure design for wallets, signatures and data sharing.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-cyber-blue">Blockchain & WEB3</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Real‑world asset tokenization and on‑chain auctions.</li>
                  <li>• Smart contracts on Base and Ethereum for production products.</li>
                  <li>• Wallet experiences that feel like Web2 but stay non‑custodial.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 2: From research to products */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border border-purple-500/40 rounded-2xl bg-black/40 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-purple">
              {language === 'en'
                ? 'From experiments to live products'
                : 'De experimentos a productos en producción'}
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl">
              {language === 'en'
                ? 'Every research line at Ekinoxis is connected to a real deployment: hackathon projects, pilots with partners, or internal tools that our hackers use every day.'
                : 'Cada línea de investigación en Ekinoxis está conectada con un despliegue real: proyectos de hackathon, pilotos con aliados o herramientas internas que nuestros hackers usan a diario.'}
            </p>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                • {language === 'en'
                  ? 'We prototype fast in hacker houses and refine what works into sustainable products.'
                  : 'Prototipamos rápido en hacker houses y refinamos lo que funciona hasta convertirlo en productos sostenibles.'}
              </li>
              <li>
                • {language === 'en'
                  ? 'We document learnings openly so other builders in LATAM can reuse patterns and architectures.'
                  : 'Documentamos aprendizajes de forma abierta para que otros constructores en LATAM puedan reutilizar patrones y arquitecturas.'}
              </li>
              <li>
                • {language === 'en'
                  ? 'We treat “innovation by default” as a practice: every engagement is an opportunity to test new ideas safely.'
                  : 'Tratamos la “innovación por defecto” como una práctica: cada proyecto es una oportunidad para probar ideas nuevas de forma segura.'}
              </li>
            </ul>
          </motion.section>
        </div>
      </div>
    </AnimatedBackground>
  );
}

