const listHelper = require('../utils/list_helper')
const emptyList = []
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
  }
];

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of empty list is 0", () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("when list has more than one blog", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(17)
  })
})

describe("favorite blog", () => {
  test("returns null on an empty blog list", () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(null)
  });

  test("when a list has one blog it returns the blog details", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);

    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    });
  });

  test("when a list has multiple blogs it returns the one with the highest number of likes", () => {

    const result = listHelper.favoriteBlog(listWithMultipleBlogs);

    expect(result).toEqual({
      title: listWithMultipleBlogs[2].title,
      author: listWithMultipleBlogs[2].author,
      likes: listWithMultipleBlogs[2].likes
    });
  });
});