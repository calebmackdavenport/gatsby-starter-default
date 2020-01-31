/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Container } from 'rsuite'
import Header from "./header"
import "./layout.scss"

const Layout = ({ children, siteTitle, siteLogo, contact, headerBreakpoint }) => {

  const styles = {
    main: {
      minheight: 'calc(100vh - 185px)',
    },
    footer: {
      width: "100%",
      height: '200px',
      position: 'relative',
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'white',
    },
    linkContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    link: {
      margin: '0 15px',
    },
    span: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactLine: {
      marginBottom: '10px'
    }
  }
  return (
    <Container>
      <Header siteTitle={siteTitle} logo={siteLogo} breakpoint={headerBreakpoint} />
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>
        {contact
          ? <div>
            <h6 style={styles.contactLine}>{contact.address1}</h6>
            <h6 style={styles.contactLine}>{`${contact.city} ${contact.postal_code}`}</h6>
            <h6 style={styles.contactLine}>{`Phone: ${contact.phone_number}`}</h6>
            <h6 style={styles.contactLine}>{`Email: ${contact.email}`}</h6>
          </div>
          : null
        }
        <span style={styles.span}>
          <div>© {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">&nbsp;Gatsby</a></div>
          <a style={{ height: '35px', margin: '0 20px' }} href="https://cosmicjs.com/add-bucket?import_bucket=5cbf745a10d5c22da1f9b3e2"><img src="https://s3-us-west-2.amazonaws.com/cosmicjs/51fe54d0-4f6e-11e9-9f32-8d001da69630-powered-by-cosmicjs.svg" /></a>
        </span>
      </footer>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
  siteLogo: PropTypes.object,
  contact: PropTypes.object,
  connect: PropTypes.array,
  headerBreakpoint: PropTypes.number,
}

export default Layout
