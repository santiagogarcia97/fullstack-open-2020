const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const {MONGO_URL} = require('./utils/config')
const res = require('./resolvers')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
  Query: {
    authorCount: () => Author.count({}),
    bookCount: () => Book.count({}),
    allBooks: res.allBooks,
    allAuthors: () => Author.find({}),
  },

  Mutation: {
    addBook: res.addBook,
    editAuthor: res.editAuthor
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`)
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })