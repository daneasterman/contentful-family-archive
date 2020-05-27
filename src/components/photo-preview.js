import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ photo }) => (
  <>
    <div className={styles.preview}>
      <Img alt="" fluid={photo.image.fluid} />
      <h3 className={styles.previewTitle}>
        <Link to={`/photograph/${photo.slug}`}>{photo.title}</Link>
      </h3>
    </div>
  </>
)
