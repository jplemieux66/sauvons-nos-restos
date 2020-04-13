import { graphql } from "gatsby"
import React from "react"
import InfiniteScroll from "react-infinite-scroller"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"

import Layout from "../components/layout"
import RestaurantCard from "../components/restaurant-card"
import indexStyles from "./index.module.scss"
import searchIcon from "./search-outline.svg"
import ReactGA from "react-ga"
import { geolocated } from "react-geolocated"

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

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
    const { data, isGeolocationAvailable, coords } = this.props
    const { cardsToShow, searchText } = this.state

    let nodes = data.allAirtable.nodes

    if (isGeolocationAvailable && coords) {
      ReactGA.event({
        category: "Geolocation",
        action: "Geolocation enabled",
      })
      const myLat = coords.latitude
      const myLong = coords.longitude

      nodes = nodes
        .filter(n => n.data.LatLong)
        .map(n => {
          const nLat = parseFloat(n.data.LatLong.split(",")[0])
          const nLong = parseFloat(n.data.LatLong.split(",")[1])
          const nDist = distance(myLat, myLong, nLat, nLong)

          return {
            ...n,
            dist: nDist,
          }
        })
        .sort((a, b) => a.dist - b.dist)
    }

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
        <Helmet>
          <script src={withPrefix("script.js")} type="text/javascript" />
        </Helmet>
        <div className={indexStyles.description}>
          <h1>
            Vos restaurants préférés à Montréal risquent de fermer. <br />
            Sauvez-les!
          </h1>
          <p>
            Aidez vos restos préférés à faire face au COVID-19 en achetant des
            cartes-cadeaux.
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
                      orderLink={node.data.Order_Link}
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
          Order_Link
          LatLong
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

export default geolocated({
  userDecisionTimeout: 5000,
})(IndexPage)
