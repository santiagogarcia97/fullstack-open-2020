const { ApolloServer, gql } = require('apollo-server')
const {MONGO_URL, SECRET_SIGN} = require('./utils/config')
const res = require('./resolvers')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
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
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    authorCount: () => Author.count({}),
    bookCount: () => Book.count({}),
    allBooks: res.allBooks,
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: res.addBook,
    editAuthor: res.editAuthor,
    createUser:  res.createUser,
    login: res.login
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET_SIGN
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
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