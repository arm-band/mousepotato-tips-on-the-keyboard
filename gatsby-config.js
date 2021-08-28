console.log(process.env.GATSBY_ACTIVE_ENV, process.env.NODE_ENV)
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV
if(activeEnv === "development") {
  require("dotenv").config({
    path: `.env.${activeEnv}`,
  })
}

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Mousepotato Tips on the Keyboard`,
    author: {
      name: `Circle`,
      summary: `A mound built by the accumulation of hyperlinks are like Kowloon.`,
    },
    description: `There's room for all God's creatures, right next to my mashed potatoes tips.`,
    siteUrl: `https://mousepotato-tips-on-the-keyboard.vercel.app`,
    social: {
      twitter: ``,
    },
    defaultImage: "images/bg.jpeg",
  },
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.API_KEY,
        serviceId: process.env.SERVICE_ID,
        apis: [{
          endpoint: process.env.APIS_ENDPOINT,
        }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-62251910-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ryz`,
        short_name: `Ryz`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    "gatsby-plugin-dark-mode",
    `gatsby-plugin-postcss`,
  ],
}
