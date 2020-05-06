import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async blog => {
  const config = { headers: { Authorization: token } }
  const id = blog.id

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return res.data
}

const remove = async blog => {
  const config = { headers: { Authorization: token } }
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

const addComment = async (blogId, comment) => {
  const config = { headers: { Authorization: token } }
  const res = await axios
    .post(`${baseUrl}/${blogId}/comments`, { comment }, config)
  return res.data
}

export default { getAll, create, update, remove, addComment, setToken }