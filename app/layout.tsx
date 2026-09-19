import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

export const viewport: Viewport = {
  themeColor: "#f9fafb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shuraimbhat.com"),
  title: "Shuraim Shakeel Bhat | Network Security Engineer",
  description:
    "Shuraim Shakeel Bhat is a Network Security Engineer specializing in Next-Generation Firewalls, multi-vendor enterprise routing, keepalived VRRP failover, and SSL VPN cross-plane verification.",
  keywords: [
    "Shuraim Shakeel Bhat",
    "Shuraim Bhat",
    "Network Security Engineer",
    "NGFW",
    "SSL VPN",
    "Cisco Catalyst",
    "MikroTik RouterOS",
    "keepalived VRRP",
    "OSPF Area 0",
    "Wireshark",
    "Scapy",
    "Linux Networking",
  ],
  authors: [{ name: "Shuraim Shakeel Bhat", url: "https://linkedin.com/in/shuraim-shakeel-bhat-765076237" }],
  creator: "Shuraim Shakeel Bhat",
  publisher: "Shuraim Shakeel Bhat",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shuraimbhat.com",
    siteName: "Shuraim Shakeel Bhat",
    title: "Shuraim Shakeel Bhat | Network Security Engineer",
    description:
      "Network Security Engineer specializing in Next-Generation Firewalls, multi-vendor enterprise routing, keepalived VRRP failover, and SSL VPN cross-plane verification.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f9fafb] text-[#171717] font-sans antialiased selection:bg-[#171717] selection:text-[#f9fafb] relative">
        <div className="background-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
