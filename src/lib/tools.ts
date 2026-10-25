/**
 * Display name and website for every logo in content.ts → technologies.categories,
 * keyed by the logo's path. File names are not names ("OCclsw4c_400x400.jpg" is
 * Notion), so the label and the link live here, once, for the home band and
 * /tech-stack alike. A logo missing from this map still renders, unlabelled and unlinked.
 */
export const TOOLS: Record<string, { name: string; url: string }> = {
  '/tecnologies/AI/ChatGPT-Logo.png': { name: 'ChatGPT', url: 'https://chatgpt.com' },
  '/tecnologies/AI/Claude_AI_logo.png': { name: 'Claude', url: 'https://claude.ai' },
  '/tecnologies/AI/cursor.png': { name: 'Cursor', url: 'https://cursor.com' },
  '/tecnologies/AI/v0-logo-light.png': { name: 'v0', url: 'https://v0.dev' },
  '/tecnologies/AI/gemini.webp': { name: 'Gemini', url: 'https://gemini.google.com' },
  '/tecnologies/AI/grok.webp': { name: 'Grok', url: 'https://grok.com' },
  '/tecnologies/AI/deepseek.webp': { name: 'DeepSeek', url: 'https://www.deepseek.com' },
  '/tecnologies/icons/elevenlabs.svg': { name: 'ElevenLabs', url: 'https://elevenlabs.io' },
  '/tecnologies/icons/higgsfield.svg': { name: 'Higgsfield', url: 'https://higgsfield.ai' },
  '/tecnologies/AI/typesafe-jev.png': { name: 'Jev', url: 'https://typesafe.ai' },

  '/tecnologies/Crypto/Blockchains/Base_Logo_1.png': { name: 'Base', url: 'https://www.base.org' },
  '/tecnologies/Crypto/Blockchains/ethereum.png': { name: 'Ethereum', url: 'https://ethereum.org' },
  '/tecnologies/Crypto/Blockchains/op mainnet.png': { name: 'Optimism', url: 'https://www.optimism.io' },
  '/tecnologies/Crypto/Blockchains/polygon.png': { name: 'Polygon', url: 'https://polygon.technology' },
  '/tecnologies/Crypto/Blockchains/unichain.png': { name: 'Unichain', url: 'https://www.unichain.org' },

  '/tecnologies/Crypto/Protocols/uniswap-uni-logo.png': { name: 'Uniswap', url: 'https://uniswap.org' },
  '/tecnologies/Crypto/Protocols/aave.svg': { name: 'Aave', url: 'https://aave.com' },
  '/tecnologies/Crypto/Protocols/ens.svg': { name: 'ENS', url: 'https://ens.domains' },
  '/tecnologies/Crypto/Protocols/safe.svg': { name: 'Safe', url: 'https://safe.global' },

  '/tecnologies/Crypto/wallet providers/privy.png': { name: 'Privy', url: 'https://www.privy.io' },
  '/tecnologies/Crypto/wallet providers/alchemy.png': { name: 'Alchemy', url: 'https://www.alchemy.com' },
  '/tecnologies/Crypto/wallet providers/thirdweb.png': { name: 'thirdweb', url: 'https://thirdweb.com' },

  '/tecnologies/Deployments/Vercel_Logo_1.png': { name: 'Vercel', url: 'https://vercel.com' },
  '/tecnologies/icons/supabase.svg': { name: 'Supabase', url: 'https://supabase.com' },
  '/tecnologies/infraservices/Primary_Vertical_Lockup_Full_Color.png': { name: 'Firebase', url: 'https://firebase.google.com' },

  '/tecnologies/Creativity/canva.webp': { name: 'Canva', url: 'https://www.canva.com' },
  '/tecnologies/Creativity/figma.png': { name: 'Figma', url: 'https://www.figma.com' },
  '/tecnologies/Creativity/illustrator.webp': { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html' },

  '/tecnologies/automations/n8n-color.png': { name: 'n8n', url: 'https://n8n.io' },
  '/tecnologies/automations/zapier.webp': { name: 'Zapier', url: 'https://zapier.com' },

  '/tecnologies/management/g-drive.png': { name: 'Google Drive', url: 'https://drive.google.com' },
  '/tecnologies/management/OCclsw4c_400x400.jpg': { name: 'Notion', url: 'https://www.notion.so' },

  '/tecnologies/marketing/shopify_logo_white.png': { name: 'Shopify', url: 'https://www.shopify.com' },
  '/tecnologies/marketing/metaads.svg': { name: 'Meta Ads', url: 'https://www.facebook.com/business/ads' },

  '/tecnologies/paymentintegrations/Stripe/Stripe_Logo_1.png': { name: 'Stripe', url: 'https://stripe.com' },
  '/tecnologies/paymentintegrations/Coinbase/Coinbase.png': { name: 'Coinbase', url: 'https://www.coinbase.com' },
  '/tecnologies/paymentintegrations/PayPal/PayPal_Logo_Alternative_1.png': { name: 'PayPal', url: 'https://www.paypal.com' },
  '/tecnologies/paymentintegrations/MercadoPago/mercadopago.png': { name: 'Mercado Pago', url: 'https://www.mercadopago.com' },
  '/tecnologies/paymentintegrations/wompi/wompi.png': { name: 'Wompi', url: 'https://wompi.com' },
};
