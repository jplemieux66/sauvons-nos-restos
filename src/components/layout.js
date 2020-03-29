import React from "react"
import Header from "./header"

import layoutStyles from "./layout.module.scss"
import SEO from "./SEO"

const Layout = props => {
  return (
    <div>
      <SEO />
      <div className={layoutStyles.coloredBackground}></div>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <Header />
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
