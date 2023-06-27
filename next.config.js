const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@fancyapps/ui']);

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = withPlugins([
  withTM
], nextConfig);