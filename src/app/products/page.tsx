'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export default function ProductsPage() {
  const { language } = useLanguage();
  const t = content[language].products;

  return (
    <AnimatedBackground variant="grid">
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
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Product Showcase */}
          {t.showcase && (
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyber-blue"
              >
                {t.showcase.title}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.showcase.items.map((product: any, idx: number) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    style={{ perspective: '1000px' }}
                  >
                    <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full flex flex-col transform hover:scale-105 transition-transform">
                      {/* Product Image */}
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyber-blue/20 to-purple-500/20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col p-6">
                        <h3 className="text-2xl font-bold mb-3 text-cyber-blue">
                          {product.name}
                        </h3>
                        <p className="text-gray-300 mb-4 flex-1">
                          {product.description}
                        </p>

                        {/* Technologies & Categories */}
                        <div className="mb-4 space-y-2">
                          {product.technologies && product.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {product.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 text-xs rounded-full bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {product.categories && product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {product.categories.map((cat: string) => (
                                <span
                                  key={cat}
                                  className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Hackathon Info */}
                        {product.hackathon && (
                          <div className="mb-4 text-sm text-gray-400">
                            <span className="font-semibold">Built on: </span>
                            {product.hackathonLink ? (
                              <a
                                href={product.hackathonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyber-blue hover:text-cyber-blue/80 underline"
                              >
                                {product.hackathon}
                              </a>
                            ) : (
                              <span>{product.hackathon}</span>
                            )}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-700">
                          {product.website && (
                            <a
                              href={product.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/30 transition-colors"
                            >
                              <ExternalLink size={16} />
                              <span className="text-sm font-semibold">Website</span>
                            </a>
                          )}
                          {product.github && (
                            <a
                              href={product.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600 transition-colors"
                            >
                              <Github size={16} />
                              <span className="text-sm font-semibold">GitHub</span>
                            </a>
                          )}
                          {product.githubSecondary && (
                            <a
                              href={product.githubSecondary}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600 transition-colors"
                            >
                              <Github size={16} />
                              <span className="text-sm font-semibold">Contracts</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyber-blue">
              {language === 'en' ? 'Product Categories' : 'Categorías de Productos'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(t.categories).map(([key, category], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.15 }}
                  style={{ perspective: '1000px' }}
                >
                  <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full p-8 transform hover:scale-105">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-cyber flex items-center justify-center">
                        <span className="text-4xl">
                          {key === 'blockchain' && '⛓️'}
                          {key === 'crypto' && '₿'}
                          {key === 'ai' && '🤖'}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-cyber-blue">
                        {category}
                      </h2>
                      <p className="text-gray-400">
                        {language === 'en' 
                          ? 'Innovative solutions leveraging cutting-edge technologies'
                          : 'Soluciones innovadoras aprovechando tecnologías de vanguardia'}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

