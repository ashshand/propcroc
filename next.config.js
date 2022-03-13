module.exports = ({
    pageExtensions: ["tsx"],
  
    /*this works - go to old-about and it will redirect to about 
    async rewrites() {
      return [
        {
          source: '/old-about/:path*',
          destination: '/about', // The :path parameter isn't used here so will be automatically passed in the query
        },
      ]
    },
    */
    
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push(
        ...[
          {
            test: /\.yml$/,
            type: "json",
            use: "yaml-loader",
          },
          {
            test: /\.svg$/,
            use: "@svgr/webpack",
          },
        ]
      );
      return config;
    },
  });
  