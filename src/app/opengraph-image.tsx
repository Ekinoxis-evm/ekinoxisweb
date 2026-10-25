import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// The link preview for every page (WhatsApp, LinkedIn, X): 1200×630, the brand mark
// and headline on the dark half of the equinox horizon — the same frame the home
// hero settles on. JPEG because the OG renderer cannot decode WebP.
export const alt = 'Ekinoxis Labs — AI, blockchain and cryptography lab in Cali, Colombia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const horizon = await readFile(join(process.cwd(), 'public/media/og/horizon.jpg'));
  const horizonSrc = `data:image/jpeg;base64,${horizon.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px 80px',
          color: '#e8f2fb',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={horizonSrc} width={1200} height={630} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 184 184">
            <circle cx="92" cy="92" r="87.4" fill="#04121a" stroke="#3F4951" strokeWidth="1.5" />
            <path d="M 92 4.6 A 87.4 87.4 0 0 1 92 179.4 Z" fill="#8FF5FF" />
            <line x1="92" y1="1" x2="92" y2="183" stroke="#04121a" strokeWidth="2.2" />
          </svg>
          <div style={{ display: 'flex', fontSize: 34, letterSpacing: 2, color: '#e8f2fb' }}>
            <span style={{ color: '#8ff5ff' }}>[</span>&nbsp;EKINOXIS&nbsp;<span style={{ color: '#8ff5ff' }}>]</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, maxWidth: 980 }}>
            We build with AI, blockchain and crypto.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#a2acb5' }}>
            Software, consultation and courses — for businesses in Colombia and the USA.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8a949c', letterSpacing: 4 }}>
          <span>EKINOXIS.XYZ</span>
          <span style={{ color: '#8ff5ff' }}>COLOMBIA · USA</span>
        </div>
      </div>
    ),
    size,
  );
}
