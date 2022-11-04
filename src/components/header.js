import * as React from "react"
import PropTypes from "prop-types"
import dpLogo from "../images/dp-icon.svg"

const Header = ({ siteTitle }) => (
  // <h3>
  //   DP
  //   <small class="text-muted">crosswords</small>
  // </h3>
  <header
    className="flex align-items-center mx-auto"
  >
    <div className="flex pt-4 ps-4 justify-content-center">
      <img alt="Gatsby logo" width={50} style={{ margin: 0 }} src={dpLogo} />
      <span className="fs-4 ms-3">CROSSWORDS</span>
    </div>
  </header>
  
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
