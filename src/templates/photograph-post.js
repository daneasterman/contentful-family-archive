import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import { DiscussionEmbed } from 'disqus-react'

import heroStyles from '../components/hero.module.css'

class PhotographPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPhotographPost')
    const title = get(this.props, 'data.contentfulPhotographPost.title')
    const slug = get(this.props, 'data.contentfulPhotographPost.slug')

    const imageCaption = get(
      this.props,
      'data.contentfulPhotographPost.imageCaption'
    )
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: slug, title },
    }

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.image.fluid}
            />
          </div>

          {imageCaption ? (
            <div className="wrapper">
              <h1 className="section-headline">{post.title}</h1>
              <p>{imageCaption.imageCaption}</p>
            </div>
          ) : null}
        </div>
        <DiscussionEmbed {...disqusConfig} />
      </Layout>
    )
  }
}

export default PhotographPostTemplate

export const pageQuery = graphql`
  query PhotoPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPhotographPost(slug: { eq: $slug }) {
      title
      slug
      image {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
        }
      }
      imageCaption {
        imageCaption
      }
    }
  }
`
