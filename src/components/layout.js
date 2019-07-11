import React from "react"
import { Link } from "gatsby"
import logo from "../assets/mi-kli-do.png"

export default ({ children }) => (
  <div className="page">
    <nav className="navbar">
      <Link to={`/`}>
        <img src={logo} alt="Mikłido" height={100} />
      </Link>

      <Link to={`/about`} className="link-about">
        About
      </Link>
    </nav>

    {children}
  </div>
)
