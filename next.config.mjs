/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/domestic', destination: '/commercial', permanent: true },
      { source: '/services/regular-home-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/deep-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/end-of-tenancy-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/move-in-move-out-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/carpet-upholstery-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/mattress-cleaning', destination: '/commercial', permanent: true },
      { source: '/services/ironing-laundry', destination: '/commercial', permanent: true },
      { source: '/services/window-cleaning', destination: '/commercial', permanent: true },
    ];
  },
};

export default nextConfig;
