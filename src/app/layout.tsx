import './globals.css'
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const dynamicParams = true;
import { ClerkProvider } from "@clerk/nextjs/app-beta";

export const metadata = { 
  title: 'Emoji Twitter',
  description: 'twiitter but less angry ',
  icons: {
      icon:"/favicon.png" 
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <ClerkProvider>
       <body className={inter.className}>{children}</body>
      </ ClerkProvider>
    </html>
  )
}
