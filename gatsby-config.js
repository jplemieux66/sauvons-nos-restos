require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Sauvons nos restos",
    description:
      "Tes restaurants préférés à Montréal risquent de fermer. Contribue à les sauver.",
    url: "https://www.sauvonsnosrestos.com",
    image: "/images/resto.jpg",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: `appnPyoKmtD6AwttW`,
            tableName: `Restaurants`,
            mapping: { Image: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "sauvons-nos-restos",
        protocol: "https",
        hostname: "www.sauvonsnosrestos.com",
      },
    },
    "gatsby-plugin-react-helmet",
  ],
}
