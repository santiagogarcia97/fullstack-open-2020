const dummy = (blogs) => {
  return 1
}

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}