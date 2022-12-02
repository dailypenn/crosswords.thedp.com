import * as React from "react"
import s from "styled-components"

const Hero = s.div`
  text-align: center;
  color: white;
  padding-top: 3rem;
  padding-bottom: 1rem;
  width: 100vw;
  
  animation: animateBg 5s linear infinite;
  background-image: linear-gradient(0deg,#fb7264,#19bafd,#fb7264,#19bafd);
  background-size: 100% 300%;
  @keyframes animateBg {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
`

const Background = () => {
  return <Hero></Hero>
}

export default Background
