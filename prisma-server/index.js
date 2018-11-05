const { prisma } = require('./generated/prisma-client')

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
type Query {
  todo(todoId: ID!): Todo
  todosByUser: [Todo!]!
}

type Mutation {
  createTodo(data: TodoCreateInput!) :Todo
}

input TodoCreateInput {
  title: String!
  description: String!
}

type Todo {
  id: ID!
  title: String!
  description: String!
}`;
const schema = makeExecutableSchema({ typeDefs, resolvers })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress } = require('apollo-server-express')
const jwt = require('express-jwt')
var jwks = require('jwks-rsa')

const PORT = 4000

// create our express app
const app = express()

// enable CORS
app.use(cors())

// auth middleware
const auth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://bractal.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://bractal.auth0.com/api/v2/',
  issuer: 'https://bractal.auth0.com/',
  algorithms: ['RS256']
})

// graphql endpoint
app.use(
  '/',
  bodyParser.json(),
  auth,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      prisma,
    }
  }))
)

app.listen(PORT, () => {
  console.log(`The GraphQL server is running on http://localhost:${PORT}/`)
})