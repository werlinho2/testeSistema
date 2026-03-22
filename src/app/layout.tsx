import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OdontoFav ERP',
  description: 'Sistema Omnichannel Odontológico integrado com N8n',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#F8FAFC] transition-colors duration-300`}>
        {/* Camada Injetada de Reatividade */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
