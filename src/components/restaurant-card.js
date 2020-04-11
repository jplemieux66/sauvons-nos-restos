import React from "react"
import PropTypes from "prop-types"
import ReactGA from "react-ga"

import restaurantCardStyles from "./restaurant-card.module.scss"
import Image from "./image"

const RestaurantCard = props => {
  return (
    <div className={restaurantCardStyles.card}>
      <Image src={props.image}></Image>
      <h3 className={restaurantCardStyles.title}>{props.name}</h3>
      <a
        className={restaurantCardStyles.link}
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          ReactGA.event({
            category: "Links",
            action: "Click on gift card link",
          })
        }
      >
        Carte Cadeau
      </a>
      {props.orderLink !== null && (
        <a
          className={restaurantCardStyles.link}
          href={props.orderLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            ReactGA.event({
              category: "Links",
              action: "Click on order link",
            })
          }
        >
          Commande
        </a>
      )}
    </div>
  )
}

export default RestaurantCard

RestaurantCard.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
}

RestaurantCard.defaultProps = {
  title: null,
  link: null,
  image: null,
}
