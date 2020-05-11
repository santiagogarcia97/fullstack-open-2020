import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {useMutation, useQuery} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, SET_AUTHOR_BIRTH_YEAR } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
  })
  const [setBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        setBirthYear={setBirthYear}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App