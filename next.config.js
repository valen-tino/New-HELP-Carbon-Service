/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    MONGODB_URI: "mongodb://localhost:27017/carbon-footprint" || "mongodb+srv://enrico:enrico2024-@mern-bit320-internship.1lyjgsi.mongodb.net/?retryWrites=true&w=majority&appName=MERN-BIT320-Internship",
    SECRET_JWT:"4c83b54804daca90736dd6b6d22d376e516793cb486f47e0e54ecd0fdc57d124074ad31597ff23167d626bab56f330a416480f83137b96aab7a348146d5761532b1041d6c89c07ed2077ab1476c774d22a15b6badfa15d1c0bee5944586405de14c1a032e1836f10282bffed58280506990e2ae383a16481b0b87ee4affe813cb687d5fc773f1cc1219bf3213fa39c1b124dea7e264b60c765a4e6004acab3a5724f8e57be357e6899602018513cd0b08f84d4bd4e96c9596f5e6e99c980010b1e20e2fa5eaeb1f57ed81ea4920bc8d0bd8d36cf16c025ecf34653439c79243852128442309d93e0482044d411dbed0daeadfcc34e7f4695560da4fc58f5e974"
  },
};

module.exports = nextConfig;
