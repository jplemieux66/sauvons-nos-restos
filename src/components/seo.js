// Taken from https://www.gatsbyjs.org/docs/add-seo-component/

import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        siteUrl: url
        image
      }
    }
  }
`

const SEO = ({ title, description, image }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: { title, description, siteUrl, image },
      },
    }) => {
      const seo = {
        title: title,
        description: description,
        image: `${siteUrl}${image}`,
        url: `${siteUrl}/`,
      }
      return (
        <>
          <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
}
