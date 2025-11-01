# Ekinoxis Website

A professional, cyberpunk-themed multi-page website for Ekinoxis Innovation Laboratory, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Multi-page Architecture**: Separate pages for each section using Next.js App Router
- 🌍 **Bilingual Support**: Full English and Spanish translations
- 🎨 **Cyberpunk Design**: Electric blue, black, and purple color scheme with advanced animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Modern Stack**: Next.js 14, React 18, TypeScript, Framer Motion, Tailwind CSS
- 🎭 **Interactive Animations**: Smooth transitions, hover effects, and scroll animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ekinoxis web/
├── public/              # Static assets (images, logos, etc.)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── page.tsx    # Home page
│   │   ├── education/
│   │   ├── certifications/
│   │   ├── hacker-house/
│   │   ├── products/
│   │   ├── research/
│   │   ├── culture/
│   │   ├── tech-stack/
│   │   ├── services/
│   │   └── hackers/
│   ├── components/     # React components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ui/         # Reusable UI components
│   ├── contexts/       # React contexts
│   │   └── LanguageContext.tsx
│   └── lib/            # Utilities and content
│       └── content.ts  # Bilingual content structure
```

## Pages

- **Home** (`/`) - Hero section with animated logo and social links
- **Education** (`/education`) - University and government partners
- **Certifications** (`/certifications`) - Certification partners
- **Hacker House** (`/hacker-house`) - Hackathon participation
- **Products** (`/products`) - Product showcase
- **Research** (`/research`) - Research and collaboration
- **Culture** (`/culture`) - Open source values and principles
- **Tech Stack** (`/tech-stack`) - Technology stack visualization
- **Services** (`/services`) - Consultancy and development services
- **Hackers** (`/hackers`) - Team member profiles

## Customization

### Colors

Edit `tailwind.config.js` to customize the cyberpunk color scheme:
- `cyber-blue`: #00F0FF
- `cyber-purple`: #8B5CF6
- `cyber-black`: #000000

### Content

Update bilingual content in `src/lib/content.ts` for both English and Spanish.

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Update `src/components/Navigation.tsx` to include the new route

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Context** - Global state management for language

## License

© 2024 Ekinoxis. All rights reserved.

