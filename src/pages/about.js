import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const author    = data.site.siteMetadata.author.name
  const meta      = {
      title: 'About',
      desc: 'About Web Site'
  }

  return (
    <Layout location={location} title="Home">
      <SEO
        title={meta.title}
        description={meta.keywords}
      />
      <h1>{meta.title}</h1>
      <p>{siteTitle}は{author}のチラシの裏的なブログです。</p>
      <p>何かについて調べた際の参考記事のリンク集やちょっとした Tips を書き留めていきます。</p>
      <h2>名前の由来</h2>
      <ul>
          <li>mouse potato</li>
          <li>mouse on the keys</li>
          <li>potato tips</li>
      </ul>
      <p>以上の3つの単語・固有名詞を組み合わせました。</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
            name
        }
      }
    }
  }
`
