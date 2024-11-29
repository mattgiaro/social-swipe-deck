import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Social Swipe Deck - Viral Social Media Posts Directory'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 48,
        }}
      >
        <div style={{ 
          fontSize: 64, 
          fontWeight: 'bold',
          marginBottom: 24,
          background: 'linear-gradient(to right, #5445FF, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Social Swipe Deck
        </div>
        <div style={{ 
          fontSize: 36,
          textAlign: 'center',
          color: '#4B5563',
        }}>
          Discover Viral Social Media Posts
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 