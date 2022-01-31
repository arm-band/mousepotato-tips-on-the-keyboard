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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
            `G-VTRKVKY161`
        ],
        pluginConfig: {
          head: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMicrocmsMousepotato } }) => {
              return allMicrocmsMousepotato.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.keywords,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                })
              })
            },
            query: `
              {
                allMicrocmsMousepotato(sort: {fields: [date], order: DESC}) {
                  totalCount
                  pageInfo {
                    perPage
                    pageCount
                  }
                  edges {
                    node {
                      body
                      createdAt
                      date
                      id
                      keywords
                      publishedAt
                      revisedAt
                      slug
                      title
                      updatedAt
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Mousepotato Tips on the Keyboard's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Circle`,
        short_name: `Circle`,
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
