const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
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
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMicrocmsMousepotato.edges

  result.data.allMicrocmsMousepotato.edges.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    });
  });

  // Create blog post list pages
  const postsPerPage = result.data.allMicrocmsMousepotato.pageInfo.limit || 10
  const numPages = Math.ceil(result.data.allMicrocmsMousepotato.totalCount / postsPerPage)
  console.log(result.data.allMicrocmsMousepotato.totalCount, postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `microcmsMousepotato`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
