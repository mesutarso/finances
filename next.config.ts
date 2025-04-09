import type { NextConfig } from "next";

// const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline' 'strict-dynamic' https: blob:;
//     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//     img-src 'self' blob: https://*.googleapis.com https://*.gstatic.com *.google.com *.googleusercontent.com data: https://maj.finances.gouv.cd;
//     font-src 'self' https://fonts.gstatic.com;
//     frame-src *.google.com;
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     connect-src 'self' https://*.googleapis.com *.google.com https://*.gstatic.com data: blob: https://maj.finances.gouv.cd/api;
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
//     worker-src blob:;
// `;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "maj.finances.gouv.cd",
        protocol: "https",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: cspHeader.replace(/\n/g, ""),
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
