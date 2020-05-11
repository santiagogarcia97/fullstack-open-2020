import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    {
        allAuthors {
            name
            born
        }
    }
`

export const GET_BOOKS = gql`
    query getBooks($author: String, $genre: String){
        allBooks (author: $author, genre: $genre){
            title
            published
            author{
                name
            }
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
            author{
                name
            }
            id
            genres
        }
    }
`

export const SET_AUTHOR_BIRTH_YEAR = gql`
    mutation setAuthorBirthYear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username
            password: $password
        ) {
            value
        }
    }
`

export const USER = gql`{
    me {
        username
        favoriteGenre
    }
}
`
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            author{
                name
            }
            id
            genres
        }
    }
`

