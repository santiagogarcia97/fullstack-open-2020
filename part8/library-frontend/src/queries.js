import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    {
        allBooks {
            title
            published
            author
            id
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author
            id
            genres
        }
    }
`