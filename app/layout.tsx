import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Ozempo - Online Medical Consultations',
  description: 'Get expert medical advice from qualified doctors. Fast, secure, and convenient healthcare from the comfort of your home.',
  generator: 'Next.js',
  keywords: ['pharmacy', 'telemedicine', 'medical consultation', 'online healthcare', 'prescription'],
  authors: [{ name: 'Ozempo Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  )
}
