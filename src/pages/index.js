import React from "react"

import indexStyles from "./index.module.scss"
import Layout from "../components/layout"
import RestaurantCard from "../components/restaurant-card"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
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
  `)

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

      <div className={indexStyles.restaurantsList}>
        {data.allAirtable.nodes.map(node => {
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
    </Layout>
  )
}

export default IndexPage
