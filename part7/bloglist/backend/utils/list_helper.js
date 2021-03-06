const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  const maxLikes = Math.max(...blogs.map(b => b.likes))
  const favBlog = blogs.find(b => b.likes === maxLikes)

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const blogsPerAuthor = _.countBy(blogs, 'author')
  const sortedByBlogCount = _.toPairs(blogsPerAuthor).sort((a, b) => b[1] - a[1])
//  console.log(sortedByBlogCount)
  const mostBlogs = sortedByBlogCount[0]
  return { author: mostBlogs[0], blogs: mostBlogs[1] }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  let likesPerAuthor = {}
  blogs.forEach(blog => {
    likesPerAuthor[blog.author] = (likesPerAuthor[blog.author] || 0) + blog.likes
  })

  const sortedByLikes = _.toPairs(likesPerAuthor).sort((a, b) => b[1] - a[1])
  const authorWithMostLikes = sortedByLikes[0]
  return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}