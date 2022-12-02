import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Background from "../components/background"

const IndexPage = () => (
  <Layout>
    <Background />
  </Layout>
)

export const Head = () => <Seo title="DP Crosswords" />

export default IndexPage
