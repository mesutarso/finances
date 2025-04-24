import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ViewTransitions } from 'next-view-transitions'
import Providers from "@/components/providers/react-query";
import ScrollToTopButton from "@/components/shared/scroll-to-top-button";


const myriadPro = localFont({
  src: [{
    path: '../public/fonts/MyriadPro-Regular.otf',
    weight: '400',
    style: 'normal',
  },
  {
    path: '../public/fonts/MyriadPro-Bold.otf',
    weight: '700',
    style: 'bold',
  },
  ],

  variable: "--font-myriad-pro",
})



export const metadata: Metadata = {
  title: "Ministère des Finances",
  description: "Ministère des Finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <Providers>
        <html lang="fr">
          <body
            className={`${myriadPro.variable} ${myriadPro.className} antialiased`}
          >
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <ScrollToTopButton />
            <Footer />
          </body>
        </html>
      </Providers>
    </ViewTransitions>

  );
}
