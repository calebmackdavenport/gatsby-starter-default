require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Davenport Computing Solutions`,
    description: `DCS - Your one stop shop for all your computing needs.`,
    author: `Caleb Davenport`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-transformer-sharp`
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-agency-portfolio`,
        short_name: `GAP`,
        start_url: `/`,
        // icon: `src/images/gap_logo.svg`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
      }
    },
    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: process.env.COSMIC_BUCKET_SLUG,
        objectTypes: [`pages`, `people`, `services`, `projects`, `settings`, `connects`, `skills`, `clients`, `contacts`],
        apiAccess: {
          read_key: process.env.COSMIC_READ_KEY,
        }
      }
    }
  ],
}
