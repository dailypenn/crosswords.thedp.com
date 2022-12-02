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
  const otherPubs = ["34th Street", "Under the Button"]

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
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {otherPubs.map(p => (
                  <Nav.Link>{p}</Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* <nav className="navbar p-4 justify-content-start">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          click
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
        <div className="pt-1 ps-4">
          <img
            alt="Gatsby logo"
            width={40}
            style={{ margin: 0 }}
            src={dpLogo}
          />
          <span className="fs-5 ms-2">CROSSWORDS</span>
        </div>
      </nav> */}
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
