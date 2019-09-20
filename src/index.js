const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')


const resolvers = {
  Query: {
    events: (root, args, context, info) => {
      return context.prisma.events()
    },
    users: (root, args, context, info) => {
      return context.prisma.users()
    },
  },
  Mutation: {
      event: (root, args, context) => {
          return context.prisma.createEvent({
            title: args.title,
            notes: args.notes,
            startDate: args.startDate,
            endDate: args.endDate,
            attendees: args.attendees
          })
      },
      user: (root, args, context) => {
        return context.prisma.createUser({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          telephone: args.telephone
        })
      }
  },
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma}
})
server.start(() => console.log(`Server is running on http://localhost:4000`))


// Event: {
//   id: (parent) => parent.id,
//   title: (parent) => parent.title,
//   notes: (parent) => parent.notes,
//   startDate: (parent) => parent.startDate,
//   endDate: (parent) => parent.endDate
// },
// User: {
//   id: (parent) => parent.id,
//   firstName: (parent) => parent.firstName,
//   lastName: (parent) => parent.lastName,
//   email: (parent) => parent.email,
//   telephone: (parent) => parent.telephone
// },