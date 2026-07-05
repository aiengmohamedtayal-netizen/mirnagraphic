import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import Navbar from "@/components/layout/Navbar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import LocationFooter from "@/components/sections/LocationFooter";
import { ViewTransitions } from 'next-view-transitions';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const thmanyah = localFont({
  src: [
    { path: './fonts/thmanyah/thmanyahsans-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/thmanyah/thmanyahsans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/thmanyah/thmanyahsans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/thmanyah/thmanyahsans-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/thmanyah/thmanyahsans-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-thmanyah',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mirna Graphic | Premium Packaging Manufacturer",
  description: "Pioneering Premium Carton Packaging Solutions in El Mahalla El Kubra with Absolute Digital Precision. Official B2B Manufacturer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={thmanyah.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-manrope: 'Manrope', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased font-sans bg-background text-foreground min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground">
        <ViewTransitions>
          <LocaleProvider>
            <ReadingProgress />
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <LocationFooter />
          </LocaleProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
