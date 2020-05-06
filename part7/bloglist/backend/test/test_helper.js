const Blog = require('../models/blog')
const User = require('../models/user')

let initialBlogs = [
  {
    title: "Title 1",
    author: "Author 1",
    url: "https://www.asfasf.com",
    likes: 4
  },
  {
    title: "Title 2",
    author: "Author 1",
    url: "https://www.zvzvz.com",
    likes: 6
  },
  {
    title: "Title 3",
    author: "Author 2",
    url: "https://www.fgjfj.com",
    likes: 13
  }
]
const user1 = {
  username: 'user1',
  passwordHash: '$2a$10$1QlHqElY5ww16OkXu5zwm.dmlB2VqvfkQkpdO37EwgkxDmdxXvYm6',
  name: 'asd'
}
const user2 = {
  username: 'user2',
  passwordHash: '$2a$10$ZLy8DQ2YmpM1/oW8cyjqIOvh7nawtPeHzyTzXZ49gnMhxx1y.ItI.',
  name: 'qwe'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initBlogTest = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const res1 = await User.create(user1)
  const res2 = await User.create(user2)

  initialBlogs[0].user = res1._id
  initialBlogs[1].user = res1._id
  initialBlogs[2].user = res2._id

  const promiseArray = initialBlogs.map(blog => Blog.create(blog))
  await Promise.all(promiseArray)
}

const initLoginTest = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await User.create(user1)
}

module.exports = {
  initBlogTest,
  initLoginTest,
  usersInDb
}