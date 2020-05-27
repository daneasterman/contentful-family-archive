const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allContentfulPhotoCategory {
        edges {
          node {
            title
            slug
          }
        }
      }
      allContentfulPhotographPost {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    return
  }

  const photoCategory = path.resolve('./src/pages/photo-category.js')
  const photographPost = path.resolve('./src/templates/photograph-post.js')

  const photos = result.data.allContentfulPhotographPost.edges
  photos.forEach((photo, index) => {
    createPage({
      path: `/photograph/${photo.node.slug}/`,
      component: photographPost,
      context: {
        slug: photo.node.slug,
      },
    })
  })

  const categories = result.data.allContentfulPhotoCategory.edges
  categories.forEach((cat, index) => {
    createPage({
      path: `/category/${cat.node.slug}/`,
      component: photoCategory,
      context: {
        slug: cat.node.slug,
      },
    })
  })
}
