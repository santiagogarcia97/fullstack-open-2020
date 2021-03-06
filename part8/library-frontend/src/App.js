import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {useApolloClient, useMutation, useQuery, useSubscription} from '@apollo/client'
import {ALL_AUTHORS, GET_BOOKS, CREATE_BOOK, SET_AUTHOR_BIRTH_YEAR, LOGIN, USER, BOOK_ADDED} from './queries'
import RecommendedBooks from './components/RecommendenBooks'

const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(GET_BOOKS)
  const user = useQuery(USER)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const [addBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })
  const [setBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  const [login] = useMutation(LOGIN);

  const handleLogout = () => {
    setToken(null)
    setPage('books')
    localStorage.clear()
    client.resetStore()
  }

  const handleLogin = async (username, password) => {
    try {
      const result = await login({variables: {username, password}})
      if(result) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('libraryUserToken', token)
      }
      setPage('books')
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: GET_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: GET_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  const notification = () => errorMessage &&
    <span style={{ color: 'red' }}>
      {errorMessage}
    </span>

  useEffect(() => {
    const jsonToken = localStorage.getItem('libraryUserToken')
    if(jsonToken) setToken(jsonToken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => setPage('add')}>Add book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <p>{notification()}</p>

      <Authors
        show={page === 'authors'}
        authors={authors}
        setBirthYear={setBirthYear}
        token={token}
      />

      <Books
        show={page === 'books'} books={books}
      />

      <RecommendedBooks
        show={page === 'recommended'} books={books} user={user}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={handleLogin}
        setToken={setToken}
      />
    </div>
  )
}

export default App