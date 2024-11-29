import { ImageResponse } from 'next/og'
import { parseCreatorPageUrl } from '@/lib/utils'
import { getCreatorByIdAndPlatform } from '@/lib/actions/creators'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { slug: string } }) {
  const parsed = parseCreatorPageUrl(params.slug)
  if (!parsed) {
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
          }}
        >
          Page Not Found
        </div>
      )
    )
  }

  const { creatorId, platform } = parsed
  const { creator, posts } = await getCreatorByIdAndPlatform(creatorId, platform)
  
  if (!creator) {
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
          }}
        >
          Creator Not Found
        </div>
      )
    )
  }

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
        <img
          src={creator.profile_picture}
          alt={creator.name}
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            marginBottom: 32,
          }}
        />
        <div style={{ 
          fontSize: 64, 
          fontWeight: 'bold',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          {creator.name}
        </div>
        <div style={{ 
          fontSize: 36,
          color: '#4B5563',
          textAlign: 'center',
        }}>
          Best {platform} Posts
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 