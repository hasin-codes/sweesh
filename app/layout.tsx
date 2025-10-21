import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const editorsNote = localFont({
  src: "../components/font/EditorsNote-Light.otf",
  variable: "--font-sans",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Sweesh — Speak it, Send it",
    template: "%s · Sweesh",
  },
  description:
    "Sweesh turns your voice into ready-to-use text on your desktop. Fast, accurate transcription powered by Whisper and Groq.",
  keywords: [
    "Sweesh",
    "voice to text",
    "speech to text",
    "desktop transcription",
    "Whisper",
    "Groq",
  ],
  authors: [{ name: "Sweesh" }],
  creator: "Sweesh",
  publisher: "Sweesh",
  openGraph: {
    title: "Sweesh — Speak it, Send it",
    description:
      "Sweesh turns your voice into ready-to-use text on your desktop. Fast, accurate transcription powered by Whisper and Groq.",
    url: "/",
    siteName: "Sweesh",
    images: [
      {
        url: "/icons/128x128.png",
        width: 128,
        height: 128,
        alt: "Sweesh logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweesh — Speak it, Send it",
    description:
      "Sweesh turns your voice into ready-to-use text on your desktop. Fast, accurate transcription powered by Whisper and Groq.",
    images: ["/icons/128x128@2x.png"],
  },
  icons: {
    icon: [
      { url: "/icons/logo.svg" },
      { url: "/icons/logo.ico" },
    ],
    shortcut: ["/icons/logo.svg"],
    apple: ["/icons/logo.svg"],
    other: [
      { rel: "mask-icon", url: "/icons/logo.svg" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${editorsNote.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
