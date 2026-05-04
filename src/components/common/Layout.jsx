import React from 'react'
import Footer from './Footer'
import Headers from './Header'

const Layout = ({children}) => {
  return (
    <>
        <Headers />
        {children}
        <Footer />
    </>
  )
}

export default Layout