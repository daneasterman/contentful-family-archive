const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const photographPost = path.resolve('./src/templates/photograph-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulPhotographPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPhotographPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/photograph/${post.node.slug}/`,
            component: photographPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
