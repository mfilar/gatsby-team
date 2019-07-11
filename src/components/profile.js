import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  const { name, avatar, powers } = post.frontmatter

  return (
    <Layout>
      <div>
        <h1>{name}</h1>
        <img src={avatar} alt="" className="profile-img" />

        <h4>Super powers:</h4>
        <ul>
          {powers.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        avatar
        powers
      }
    }
  }
`
