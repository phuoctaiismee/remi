import RootLayout from "@/components/layouts/root";
import { DEVTOOL } from "@/config/env";
import { DEFAULT_METADATA } from "@/config/metadata";
import { cn } from "@/lib/utils";
import RqProvider from "@/providers/react-query";
import { ThemeProvider } from "@/providers/themes";
import { NotificationsProvider } from "@/providers/notifications";
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('site');
  return {
    ...DEFAULT_METADATA,
    title: {
      default: `Yaah | ${t('title')}`,
      template: `%s | ${t('title')}`,
    },
  };
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  minimumScale: 1,
  maximumScale: 1,
  interactiveWidget: 'resizes-content',
  colorScheme: 'dark',
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn('antialiased hide-scrollbar', geistSans.variable, geistMono.variable)}
      >

        <NextIntlClientProvider>
          <RqProvider>
            <NotificationsProvider />
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <RootLayout>
                {children}
              </RootLayout>
            </ThemeProvider>
          </RqProvider>
        </NextIntlClientProvider>

        {DEVTOOL.ENABLED && (
          <div
            dangerouslySetInnerHTML={{
              __html: `<script src="https://cdn.jsdelivr.net/npm/eruda"></script><script>eruda.init();</script>`,
            }}
          />
        )}
      </body>
    </html>
  );
}
