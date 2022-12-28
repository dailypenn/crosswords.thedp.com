import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Background from "../components/background"
import Crossword from "../components/crossword"

const IndexPage = () => (
  <Layout>
    <Background>
      <Crossword size={1.1} publication={"DP"} id={1}></Crossword>
    </Background>
    <br></br>
    <div
      style={{
        fontFamily: "Roboto Condensed",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "48px",
        lineHeight: "56px",
        textAlign: "center",
        color: "#666666",
        paddingBottom: "20px",
      }}
    >
      PREVIOUS CROSSWORDS
    </div>
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center col-sm">
          <Crossword size={1} publication={"34th"} id={2}></Crossword>
        </div>
        <div className="d-flex justify-content-center col-sm">
          <Crossword size={1} publication={"UTB"} id={3}></Crossword>
        </div>
        <div className="d-flex justify-content-center col-sm">
          <Crossword size={1} publication={"DP"} id={4}></Crossword>
        </div>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="DP Crosswords" />

export default IndexPage
