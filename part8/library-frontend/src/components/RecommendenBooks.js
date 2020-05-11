import React from 'react'

const RecommendedBooks = ({user, show, books}) => {
  if(!show || !user) return null

  const booksList = books.loading ?  [] : books.data.allBooks
  const userData = user.data.me
  const recommendedBooks = booksList
    .filter(book => book.genres.includes(userData.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{userData.favoriteGenre}</strong></p>
      <table>
        <tbody>
        <tr>
          <th>
            book
          </th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {recommendedBooks.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks