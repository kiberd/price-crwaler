import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['puppeteer-core'],
  async rewrite() {
    return [
      {
        // localhost:9000의 api 요청할 때 /api/~~ 로작성하면 'http://localhost:9000/~~' 로 요청한 것과 동일하게 적용이 된다.
        source: "/price/:path*",
        // cors로 문제가 되었던 url 입력
        destination: "https://ee28-223-131-171-229.ngrok-free.app/price/:path*"
      }
    ]
  }
};

export default nextConfig;
