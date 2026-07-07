import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // En Next.js 16, esta propiedad va en la raíz de la configuración, NO dentro de experimental
  allowedDevOrigins: ["localhost:3000", "192.168.1.5:3000", "192.168.1.5"],
};

export default nextConfig;