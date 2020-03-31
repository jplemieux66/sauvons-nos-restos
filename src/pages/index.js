import { graphql } from "gatsby"
import React from "react"
import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/layout"
import RestaurantCard from "../components/restaurant-card"
import indexStyles from "./index.module.scss"

class IndexPage extends React.Component {
  constructor() {
    super()
    this.addCards = this.addCards.bind(this)

    this.state = {
      cardsToShow: 12,
    }
  }

  addCards() {
    this.setState({ cardsToShow: this.state.cardsToShow + 12 })
  }

  render() {
    const { data } = this.props
    const { cardsToShow } = this.state

    const nodes = data.allAirtable.nodes.slice(0, cardsToShow)

    return (
      <Layout>
        <div className={indexStyles.description}>
          <h1>
            Tes restaurants préférés à Montréal risquent de fermer. Contribue à
            les sauver.
          </h1>
          <p>
            Les cartes cadeaux permettent "d'applatir la courbe" des revenus
            perdus du COVID-19.
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
          <div className={indexStyles.restaurantsList}>
            {nodes.map(node => {
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
