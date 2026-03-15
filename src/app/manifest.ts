import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Telemart Ubon — เน็ตบ้าน มือถือ โซล่าเซลล์',
    short_name: 'Telemart Ubon',
    description: 'บริการเน็ตบ้าน ซิมมือถือ และโซล่าเซลล์ครบวงจร อุบลราชธานี',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e53935',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  }
}
