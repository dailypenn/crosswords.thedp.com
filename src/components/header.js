import * as React from "react"
import PropTypes from "prop-types"
import dpLogo from "../images/dp-icon.svg"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Offcanvas from "react-bootstrap/Offcanvas"

const Header = ({ siteTitle }) => {
  // const otherPubs = ["34th Street", "Under the Button"]

  return (
    // <h3>
    //   DP
    //   <small class="text-muted">crosswords</small>
    // </h3>
    <header className="flex align-items-center mx-auto">
      <Navbar key={false} expand={false} className="mb-3">
        <Container fluid>
          <div className="pt-1 ps-4">
            <img
              alt="Gatsby logo"
              width={40}
              style={{ margin: 0 }}
              src={dpLogo}
            />
            <span className="fs-5 ms-2">CROSSWORDS</span>
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-$false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-$false`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$false`}>
                Explore
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>Under construction</Offcanvas.Body>
          </Navbar.Offcanvas>
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
