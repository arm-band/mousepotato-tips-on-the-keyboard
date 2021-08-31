import React from "react"

const Footer = () => {
  return (
    <div>
      <div className="my-12 text-center">
          <ul style={{ listStyle: "none outside", display: "flex", justifyContent: "center" }}>
              <li><a href="about">About</a></li>
          </ul>
      </div>
      <footer className="my-12 text-center">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and{" "}
        <a
          href="https://github.com/renyuanz/leonids"
          target="_blank"
          rel="noreferrer"
        >
          Leonids theme
        </a>
        .
      </footer>
    </div>
  )
}

export default Footer
