import React, {useEffect, useState} from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  const [genres, setGenres] = useState([])

  const handleGenreClick = genre => {
    setBooksToShow(books.filter(book => book.genres.includes(genre)))
  }

  const handleClearClick = () => {
    setBooksToShow(books)
  }

  useEffect(() => {
    setBooks(props.books.loading ?  [] : props.books.data.allBooks)
  }, [props.books])

  useEffect(() => {
    const genresList = books.reduce((list, book) => {
      return list.concat(book.genres)
    }, [])

    setGenres([...new Set(genresList)])
    setBooksToShow(books)
  }, [books])

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
          {booksToShow.map(a =>
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
          return <button onClick={()=>{handleGenreClick(genre)}} key={genre}>{genre}</button>
        })}
        <button onClick={handleClearClick}>clear</button>
      </div>
    </div>
  )
}

export default Books