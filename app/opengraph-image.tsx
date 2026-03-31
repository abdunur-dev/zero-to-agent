import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Zero to Agent — Community Companion'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Open Graph image: dot grid, soft white accent glows, Geist Pixel headline.
 * Satori accepts TTF/OTF/WOFF — not WOFF2 — so Geist Pixel is loaded from TTF
 * (vercel/geist-font: fonts/GeistPixel/ttf).
 */
export default async function OpengraphImage() {
  const [geistPixelSquare, geistMonoRegular] = await Promise.all([
    readFile(
      join(process.cwd(), 'assets/fonts/GeistPixel-Square.ttf')
    ),
    readFile(
      join(
        process.cwd(),
        'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf'
      )
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#07070a',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(236,233,225,0.045) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 580,
            height: 580,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.92) 0%, transparent 55%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontFamily: 'Geist Mono',
              fontSize: 13,
              letterSpacing: '0.32em',
              color: '#fafafa',
              marginBottom: 22,
              textTransform: 'lowercase',
            }}
          >
            // community companion
          </div>
          <div
            style={{
              fontFamily: 'Geist Pixel',
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '0.1em',
              color: '#ece9e1',
              marginBottom: 28,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>ZERO TO</span>
            <span>AGENT</span>
          </div>
          <div
            style={{
              width: 54,
              height: 2,
              background: '#fafafa',
              marginBottom: 26,
            }}
          />
          <div
            style={{
              fontFamily: 'Geist Mono',
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#807b72',
              maxWidth: 920,
              lineHeight: 1.5,
            }}
          >
            Build · Ship · Explore · AI agent projects
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist Pixel',
          data: geistPixelSquare,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Geist Mono',
          data: geistMonoRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
