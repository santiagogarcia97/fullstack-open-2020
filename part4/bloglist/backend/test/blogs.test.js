const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Title 1",
    author: "Author 1",
    url: "https://www.google.com",
    likes: 4
  },
  {
    title: "Title 2",
    author: "Author 1",
    url: "https://www.google.com",
    likes: 6
  },
  {
    title: "Title 2",
    author: "Author 2",
    url: "https://www.facebook.com",
    likes: 13
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog(initialBlogs[0]).save()
  await new Blog(initialBlogs[1]).save()
  await new Blog(initialBlogs[2]).save()
})

describe("retriving blogs", () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test("request returns the correct amount of blogs", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body.length).toBe(3)
  })

  test("blogs have an id property", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe("saving a blog", () => {
  test("blog is saved correctly in db", async () => {
    const newBlog = {
      title: "Title 3",
      author: "Author 3",
      url: "https://www.asd.com"
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)

    const res = await api.get("/api/blogs")

    expect(res.body.length).toBe(initialBlogs.length + 1)
    expect(res.body).toContainEqual(expect.objectContaining(newBlog))
  })
})

afterAll(() => {
  mongoose.connection.close()
})