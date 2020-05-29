require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Gatsby Contentful starter',
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeDefaultDirectives: true,
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          // 'script-src': `'self' 'unsafe-inline' data: www.google-analytics.com`,
          // 'style-src': `'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com`,
          // 'img-src': `'self' data: www.google-analytics.com`,

          'script-src': `'self' 'unsafe-inline' family-photoblog.netlify.app/ https://*.disqus.com https://disqus.com`,
          'default-src': "'self' https://*.disqus.com",
          'frame-src': "'self' https://disqus.com",

          'img-src':
            "'self' data: https://images.ctfassets.net/  https://*.disqus.com https://disqus.com",
        },
      },
    },
  ],
}
