import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Titlebar } from "@/components/titlebar";
import "./globals.css";

const editorsNote = localFont({
  src: "../font/EditorsNote-Light.otf",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sweesh — Speak it. See it. Send it.",
    template: "%s — Sweesh",
  },
  description:
    "Sweesh — the fastest way to capture thoughts, reminders, and messages. Speak it, see it, send it — instantly.",
  applicationName: "Sweesh",
  keywords: [
    "voice note app for desktop",
    "voice to text productivity tool",
    "ai speech to text app",
    "quick idea capture app",
    "speech powered note app",
    "talk to text desktop app",
    "productivity tool for students",
    "voice message desktop software",
    "ai dictation app",
    "note taking with voice",
  ],
  icons: {
    icon: "/icons/app-icon.png",
    shortcut: "/icons/app-icon.png",
    apple: "/icons/app-icon.png",
  },
  openGraph: {
    title: "Sweesh — Speak it. See it. Send it.",
    description:
      "Sweesh — the fastest way to capture thoughts, reminders, and messages. Speak it, see it, send it — instantly.",
    url: "https://sweesh.app",
    siteName: "Sweesh",
    images: [
      { url: "/icons/app-icon.png", width: 512, height: 512, alt: "Sweesh" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sweesh — Speak it. See it. Send it.",
    description:
      "Sweesh — the fastest way to capture thoughts, reminders, and messages. Speak it, see it, send it — instantly.",
    images: ["/icons/app-icon.png"],
  },
  metadataBase: new URL("https://sweesh.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${editorsNote.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Titlebar />
        {children}
      </body>
    </html>
  );
}
