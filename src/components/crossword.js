import * as React from "react"
import { useState, useEffect } from "react"
import dpLogo from "../images/dp-icon.svg"
import utbLogo from "../images/utb.svg"
import thirtyFourthLogo from "../images/34th-street.svg"
import crosswordIcon from "../images/crossword-icon.png"

export default function Crossword(props) {
  const [logo, setLogo] = useState(null)
  const [color, setColor] = useState("")

  useEffect(() => {
    switch (props.publication) {
      case "DP":
        setLogo(dpLogo)
        setColor("#D72E25")
        break
      case "UTB":
        setLogo(utbLogo)
        setColor("#3964A6")
        break
      case "34th":
        setLogo(thirtyFourthLogo)
        setColor("#25B7B6")
        break
      default:
        break
    }
  }, [props.publication])
  return (
    <div
      className="bg-white rounded-4 text-center"
      style={{
        width: `${props.size * 300}px`,
        height: `${props.size * 300}px`,
        boxSizing: "border-box",
        border: `1px solid ${color}`,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <img
        src={logo}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "12%",
        }}
      ></img>
      <div
        style={{
          paddingTop: "10px",
          fontFamily: "Roboto Condensed",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: `${props.size * 22}px`,
          lineHeight: `${props.size * 26}px`,
          color: `${color}`,
        }}
      >
        TITLE
      </div>
      <div
        style={{
          fontFamily: "Roboto Condensed",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: `${props.size * 14}px`,
          lineHeight: `${props.size * 16}px`,
          color: "#666666",
          paddingBottom: "10px",
        }}
      >
        Author
      </div>
      <img
        style={{ width: "60%", margin: 0, paddingBottom: "15px" }}
        src={crosswordIcon}
      ></img>
      <div className="d-flex justify-content-center">
        <button
          className="d-block"
          style={{
            backgroundColor: `${color}`,
            borderRadius: "16px",
            color: "white",
            fontFamily: "Roboto Condensed",
            border: "1px solid black",
            width: "60%",
          }}
        >
          PLAY
        </button>
      </div>
    </div>
  )
}
