const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  events: [Event!]!
}

type Event {
    id: ID!
    title: String!
    startDate: Date!
    endDate: Date!
    notes: String!
    attendees: [User!]!
}

type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    telephone: String!
}

scalar Date
`

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}


const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))