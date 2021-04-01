const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const dotenv = require('dotenv')

dotenv.config()

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/honeyswap-v2'

const PRICE_QUERY = gql`
  query {
    tokenDayDatas(first: 1, orderBy: date, orderDirection: desc, where: {token: "${process.env.TOKEN_ID}"}) {
      priceUSD
      dailyVolumeUSD
      token {
        symbol
      }
    }
  }
`

const fetchData = async () => {
  const graphqlClient = new GraphQLWrapper(SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(PRICE_QUERY)
  
  if (!result.data) return undefined
  return result.data.tokenDayDatas[0]
}

exports.getTokenData = async () => {
  const { dailyVolumeUSD, priceUSD, token: { symbol } } = await fetchData()
  const price = parseFloat(priceUSD).toFixed(2)
  const volume = parseFloat(dailyVolumeUSD).toFixed(2)
  return { symbol, price, volume }
}
