import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from "../components/seo"


const BlogPost = props => {

  const post = props.data.markdownRemark
  const url = props.data.site.siteMetadata.siteUrl
  const { title, description } = post.frontmatter
  const thumbnail = post.frontmatter.image.childImageSharp.resize.src

  return (
    <Layout>
      <SEO title={title} description={description} thumbnail={url + thumbnail} url={url} pathname={props.location.pathname} />
      <div>
        <h1>{ title }</h1>
        <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default BlogPost
