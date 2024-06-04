import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

import LayoutComponent from "@/components/laycop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demistify",
  description:
    "Demistify: An advanced cloud and fog removal system leveraging SpaGan technology, with a sleek frontend built on Next.js 14. Developed as a final project for a degree in AI and ML at Uttarakhand Technical University.",
  icons: {
    icon: `${process.env.FAVICON_IMAGE}`, // Path to your icon file
    shortcut: `${process.env.FAVICON_IMAGE}`, // Path to your icon file
    apple: `${process.env.FAVICON_IMAGE}`, // Path to the Apple touch icon file
  },
  openGraph: {
    images: [
      {
        url: `${process.env.META_IMAGE}`,
        width: 1200,
        height: 630,
      },
      {
        url: `${process.env.META_IMAGE}`,
        width: 1200,
        height: 630,
      },
    ],
    title: "Duolingo Clone",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
  twitter: {
    card: "summary_large_image",
    images: {
      url: `${process.env.META_IMAGE}`,
    },
  },
  creator: "Naman, Himanshu, and Divyanshu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, " flex ")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutComponent>{children}</LayoutComponent>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
