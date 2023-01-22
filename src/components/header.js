import * as React from "react"
import PropTypes from "prop-types"
import dpLogo from "../images/dp-icon.svg"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import { BsFillGridFill } from "react-icons/bs"

const Header = ({ siteTitle }) => {
  return (
    <header className="flex align-items-center mx-auto">
      <Navbar key={false} expand={false} className="mb-3">
        <Container fluid>
          <div className="pt-1 ps-4">
            <a target="_blank" href="https://www.thedp.com/">
              <img
                alt="Gatsby logo"
                width={40}
                style={{ margin: 0 }}
                src={dpLogo}
              />
            </a>
            <span className="fs-5 ms-2">CROSSWORDS</span>
          </div>
          <Button className="btn btn-light">
            See All{" "}
            <BsFillGridFill
              style={{ verticalAlign: "middle" }}
            ></BsFillGridFill>
          </Button>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
