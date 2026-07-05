import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
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
  metadataBase: new URL('https://mirnagraphic.com'),
  title: {
    default: "Mirna Graphic | Premium Packaging Manufacturer",
    template: "%s | Mirna Graphic",
  },
  description: "Pioneering Premium Carton Packaging Solutions in El Mahalla El Kubra with Absolute Digital Precision. Official B2B Manufacturer.",
  openGraph: {
    title: "Mirna Graphic | Premium Packaging Manufacturer",
    description: "Pioneering Premium Carton Packaging Solutions with Absolute Digital Precision.",
    url: "https://mirnagraphic.com",
    siteName: "Mirna Graphic",
    locale: "en_US",
    alternateLocale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirna Graphic",
    description: "Premium Carton Packaging Solutions in Egypt.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${thmanyah.variable} ${inter.variable} ${manrope.variable}`}>
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
