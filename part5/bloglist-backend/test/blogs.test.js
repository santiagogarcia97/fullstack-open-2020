const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

let logedUser;

const newBlog = {
  title: "Title 3",
  author: "Author 3",
  url: "https://www.asd.com"
}
const blogWithoutTitleAndUrl = {
  author: "Author 3"
}

beforeEach(async () => {
  await helper.initBlogTest()
  logedUser = await api
    .post('/api/login')
    .send({username: 'user1', password: 'pass1'})
    .expect(200)
})

describe('retriving blogs', () => {
  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test("request returns the correct amount of blogs", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
    expect(blogs.body.length).toBe(3)
  })

})

describe("saving a blog", () => {
  test("blog is saved correctly in db", async () => {
    const initialBlogs = await api.get('/api/blogs').expect(200)

    const newBlog = {
      title: 'title3',
      author: 'author3',
      url: 'url3'
    }
    await api.post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send(newBlog)
      .expect(201)
    const res = await api.get("/api/blogs")

    expect(res.body.length).toBe(initialBlogs.body.length + 1)
    expect(res.body).toContainEqual(expect.objectContaining(newBlog))
  })

  test("on a saved blog if no likes are present default to 0", async () => {
    const newBlog = {
      title: 'title4',
      author: 'author4',
      url: 'url4'
    }
    const savedBlog = await api.post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send(newBlog)
      .expect(201)
    expect(savedBlog.body).toHaveProperty("likes", 0)
  })
  test("get a 401 when token is missing", async () => {
    await api
      .post("/api/blogs")
      .send({})
      .expect(401)
  })
  test("get a 401 when token is incorrect", async () => {
    await api
      .post("/api/blogs")
      .set('Authorization', 'bearer invalidtoken')
      .send({})
      .expect(401)
  })
  test("get a 400 when body is empty", async () => {
    await api
      .post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send({})
      .expect(400)
  })
  test("get a 400 when title is missing", async () => {
    const noTitleBlog = {
      author: 'author1',
      url: 'url1'
    }
    await api
      .post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send(noTitleBlog)
      .expect(400)
  })
  test("get a 400 when url is missing", async () => {
    const noUrlBlog = {
      author: 'author1',
      title: 'title1'
    }
    await api
      .post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send(noUrlBlog)
      .expect(400)
  })
})


describe("deleting a blog", () => {
  test("blog is deleted correctly in db", async () => {
    const newBlog = {
      title: 'title4',
      author: 'author4',
      url: 'url4'
    }
    const savedBlog = await api
      .post("/api/blogs")
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send(newBlog)
      .expect(201)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send()
      .expect(204)
  })
  test("get a 401 response when token is empty", async () => {
    await api
      .delete(`/api/blogs/malformatedid`)
      .send()
      .expect(401)
  })
  test("get a 401 response when token is invalid", async () => {
    await api
      .delete(`/api/blogs/malformatedid`)
      .set('Authorization', `bearer invalidtoken`)
      .send()
      .expect(401)
  })
  test("get a 400 response when malformated id", async () => {
    await api
      .delete(`/api/blogs/malformatedid`)
      .set('Authorization', `bearer ${logedUser.body.token}`)
      .send()
      .expect(400)
  })
})

describe("updating a blog", () => {
  test("updating a blog with a malformated id returns 400", async () => {
    await api
      .put(`/api/blogs/malformatedid`)
      .send()
      .expect(400)
  })

  test("updating likes of a blog correctly", async () => {
    const blogs = await api.get("/api/blogs")
    const id = blogs.body[0].id

    const blogUpdate = {likes: 50}

    const updatedBlog = await api.put(`/api/blogs/${id}`).send(blogUpdate)

    expect(updatedBlog.body).toHaveProperty("id", id)
    expect(updatedBlog.body).toHaveProperty("likes", blogUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})