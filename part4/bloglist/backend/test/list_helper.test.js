const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17a9",
    title: "asfasfaf",
    author: "Qwerty",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of empty list is 0", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("when list has more than one blog", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(20)
  })
})

describe("favorite blog", () => {
  test("returns null on an empty blog list", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  });

  test("when a list has one blog it returns the blog details", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    });
  });

  test("when a list has multiple blogs it returns the one with the highest number of likes", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)

    expect(result).toEqual({
      title: listWithMultipleBlogs[2].title,
      author: listWithMultipleBlogs[2].author,
      likes: listWithMultipleBlogs[2].likes
    })
  })
})

describe('mostBlogs', () => {
  test('on list with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 3 })
  })

  test('on list with multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 })
  })

  test('on empty list, return undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })
})