import React, {useEffect, useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import {GET_BOOKS} from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  const [selectedGenre, setSelectedGenre] = useState('')
  const [getBooksByGenre, result] = useLazyQuery(GET_BOOKS)
  const getBooks = (genre) => {
    getBooksByGenre({ variables: { genre: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    const genresList = books.reduce((list, book) => {
      return list.concat(book.genres)
    }, [])

    setGenres([...new Set(genresList)])
  }, [books])

  useEffect(() => {
    getBooks(selectedGenre)
  }, [selectedGenre])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {genres.map(genre => {
          return <button onClick={()=>{setSelectedGenre(genre)}} key={genre}>{genre}</button>
        })}
        <button onClick={()=>{setSelectedGenre('')}}>clear</button>
      </div>
    </div>
  )
}

export default Books