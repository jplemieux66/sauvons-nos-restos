import { graphql } from "gatsby"
import React from "react"
import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/layout"
import RestaurantCard from "../components/restaurant-card"
import indexStyles from "./index.module.scss"
import searchIcon from "./search-outline.svg"
import ReactGA from "react-ga"

class IndexPage extends React.Component {
  constructor() {
    super()

    ReactGA.initialize("UA-162831354-1")

    this.addCards = this.addCards.bind(this)
    this.onSearchTextChange = this.onSearchTextChange.bind(this)

    this.state = {
      cardsToShow: 12,
      searchText: null,
    }
  }

  addCards() {
    this.setState({ ...this.state, cardsToShow: this.state.cardsToShow + 12 })
  }

  onSearchTextChange(event) {
    this.setState({ ...this.state, searchText: event.target.value })
  }

  render() {
    const { data } = this.props
    const { cardsToShow, searchText } = this.state

    let nodes = data.allAirtable.nodes

    if (searchText !== null && searchText !== undefined) {
      nodes = nodes.filter(n => {
        if (!n.data.Name) {
          return false
        }

        return n.data.Name.toLowerCase().includes(searchText.toLowerCase())
      })
    }

    nodes = nodes.slice(0, cardsToShow)

    return (
      <Layout>
        <div className={indexStyles.description}>
          <h1>
            Tes restaurants préférés à Montréal risquent de fermer. Contribue à
            les sauver.
          </h1>
          <p>
            Les cartes cadeaux permettent "d'applatir la courbe" des revenus
            perdus de la COVID-19.
          </p>
        </div>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.addCards}
          hasMore={cardsToShow < data.allAirtable.nodes.length}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <div className={indexStyles.mainContent}>
            <div className={indexStyles.searchBar}>
              <img alt="Search Icon" src={searchIcon}></img>
              <input
                type="search"
                placeholder="Rechercher"
                onChange={this.onSearchTextChange}
              ></input>
            </div>
            <div className={indexStyles.restaurantsList}>
              {nodes
                .filter(
                  node =>
                    node &&
                    node.data &&
                    node.data.Name &&
                    node.data.Gift_Card_Link &&
                    node.data.Image &&
                    node.data.Image.localFiles
                )
                .map(node => {
                  return (
                    <RestaurantCard
                      key={node.data.Name}
                      name={node.data.Name}
                      link={node.data.Gift_Card_Link}
                      image={node.data.Image.localFiles[0].relativePath}
                    ></RestaurantCard>
                  )
                })}
            </div>
          </div>
        </InfiniteScroll>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    allAirtable {
      nodes {
        data {
          Address
          Name
          Gift_Card_Link
          Image {
            localFiles {
              relativePath
            }
          }
        }
      }
    }
  }
`

export default IndexPage
