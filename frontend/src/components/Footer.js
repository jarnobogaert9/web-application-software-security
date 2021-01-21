import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <p>&copy; 2021 Travelr</p>
      </footer>
    </>
  )
}

export default Footer
