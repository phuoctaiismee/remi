import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
