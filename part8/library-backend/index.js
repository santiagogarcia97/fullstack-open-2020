const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const {MONGO_URL, SECRET_SIGN} = require('./utils/config')
const res = require('./resolvers')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

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
        books: [Book]
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
    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
  Query: {
    authorCount: () => Author.count({}),
    bookCount: () => Book.count({}),
    allBooks: res.allBooks,
    allAuthors: res.allAuthors,
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const book = new Book({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let savedBook
      try {
        savedBook = await book.save()
        savedBook = Book.populate(savedBook, {path:'author'})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      await pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },
    editAuthor: res.editAuthor,
    createUser:  res.createUser,
    login: res.login
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
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
    server.listen().then(({ url, subscriptionsUrl }) => {
      console.log(`Server ready at ${url}`)
      console.log(`Subscriptions ready at ${subscriptionsUrl}`)
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })