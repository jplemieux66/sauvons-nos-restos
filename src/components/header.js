import React from "react"

import headerStyles from "./header.module.scss"

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div></div>

      <div className={headerStyles.headerButtonsContainer}>
        <a>FAQ</a>
        <a href="https://airtable.com/shrDHAlRbrk4lpgZn" target="_blank">
          Ajouter un restaurant
        </a>
      </div>
    </header>
  )
}

export default Header
