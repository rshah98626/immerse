const { ModuleDetectionKind } = require('typescript');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withTM = require('next-transpile-modules')(["tts-react"]);

module.exports = withTM(nextConfig)
