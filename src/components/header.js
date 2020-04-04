import React from "react"
import Modal from "react-modal"

import headerStyles from "./header.module.scss"
import { useStaticQuery, graphql } from "gatsby"

const customStyles = {
  content: {
    position: "initial",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    width: "100%",
    maxWidth: "800px",
    height: "90vh",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

Modal.setAppElement(`#___gatsby`)

const Header = () => {
  const [faqOpen, setFaqOpen] = React.useState(false)
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          html
        }
      }
    }
  `)

  return (
    <div>
      <header className={headerStyles.header}>
        <div></div>

        <div className={headerStyles.headerButtonsContainer}>
          <button onClick={() => setFaqOpen(true)}>FAQ</button>
          <a
            href="https://airtable.com/shrDHAlRbrk4lpgZn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ajouter un restaurant
          </a>
        </div>
      </header>

      <Modal
        isOpen={faqOpen}
        onRequestClose={() => setFaqOpen(false)}
        style={customStyles}
        contentLabel="FAQ"
      >
        <div className={headerStyles.faqHeader}>
          <h2>FAQ</h2>
          <button onClick={() => setFaqOpen(false)}>X</button>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: data.allMarkdownRemark.nodes[0].html,
          }}
        ></div>
      </Modal>
    </div>
  )
}

export default Header
