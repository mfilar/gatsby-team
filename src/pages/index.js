import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <h1>Meet the team</h1>
    <hr />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Urna et pharetra
      pharetra massa massa. Tortor condimentum lacinia quis vel eros donec ac.
    </p>

    <h4 className="employee-count">
      Employee count: {data.allMarkdownRemark.totalCount}
    </h4>

    <ul className="employee-list">
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <li key={index} className="employee">
          <Link to={node.fields.slug} className="employee-link">
            <img
              src={node.frontmatter.avatar}
              alt=""
              className="employee-avatar"
            />

            <h3 className="employee-name">{node.frontmatter.name}</h3>

            <p className="employee-text">{node.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            avatar
            name
          }
          excerpt(format: PLAIN, pruneLength: 40)
          fields {
            slug
          }
        }
      }
    }
  }
`
