import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ item }) => (
  <>
    <div className={styles.preview}>
      <Img
        style={{ width: '100%', maxWidth: '350px' }}
        alt=""
        fluid={item.image.fluid}
      />
      <h3 className={styles.previewTitle}>
        <Link to={`/category/${item.slug}`}>{item.title}</Link>
      </h3>
    </div>
  </>
)
