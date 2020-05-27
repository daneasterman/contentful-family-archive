import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import PhotoPreview from '../components/photo-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const photos = get(this, 'props.data.allContentfulPhotographPost.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2 className="section-headline">Recent photos</h2>
            <ul className="article-list">
              {photos.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <PhotoPreview photo={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query PhotoCategoryQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulPhotographPost(
      filter: { photo_category: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          title
          slug
          image {
            fluid(maxWidth: 350, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
