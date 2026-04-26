import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: '#C8102E',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Sandwich */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: 44,
            gap: 0,
          }}
        >
          {/* Top bun */}
          <div
            style={{
              height: 11,
              background: '#F2B44B',
              borderRadius: '99px 99px 0 0',
            }}
          />
          {/* Lettuce fringe */}
          <div style={{ height: 4, background: '#5BAD46' }} />
          {/* Meat */}
          <div style={{ height: 4, background: '#E07050' }} />
          {/* Cheese */}
          <div style={{ height: 3, background: '#F5D060' }} />
          {/* Bottom bun */}
          <div
            style={{
              height: 9,
              background: '#E8A030',
              borderRadius: '0 0 6px 6px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
