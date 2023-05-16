/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
    "react-spinners": {
      transform: "react-spinners/{{member}}",
    },
    leaflet: {
      transform: "leaflet/{{member}}",
    },
    "react-select": {
      transform: "react-select/{{member}}",
    },
    "world-countries": {
      transform: "world-countries/{{member}}",
    },
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },

  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.mdx/,
  //     use: [
  //       options.defaultLoaders.babel,
  //       {
  //         loader: "@mdx-js/loader",
  //         options: pluginOptions.options,
  //       },
  //     ],
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
