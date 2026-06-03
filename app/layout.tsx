import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fierfek.nexus'),
  title: 'fierfek.nexus',
  description:
    'Private digital services paid with Monero/XMR. Privacy, security and operational discretion.',
icons: {
  icon: '/images/favicon-v2.png',
  shortcut: '/images/favicon-v2.png',
  apple: '/images/favicon-v2.png',
},
  openGraph: {
    title: 'fierfek.nexus',
    description:
      'Private digital services paid with Monero/XMR. Privacy, security and operational discretion.',
    url: 'https://www.fierfek.nexus',
    siteName: 'fierfek.nexus',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'fierfek.nexus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fierfek.nexus',
    description:
      'Private digital services paid with Monero/XMR. Privacy, security and operational discretion.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#141414]`}>
      <body className="font-sans antialiased bg-[#141414] text-[#F2F2F2]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
