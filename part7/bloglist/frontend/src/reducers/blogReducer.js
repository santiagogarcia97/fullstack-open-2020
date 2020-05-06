import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return sortBlogs(action.data)
  case 'ADD_BLOG':
    return sortBlogs([...state, action.data])
  case 'LIKE_BLOG':
    return sortBlogs(state.map(blog =>
      blog !== action.data.id ? blog : action.data))
  case 'DELETE_BLOG':
    return sortBlogs(state.filter(blog => blog.id !== action.data.id))
  default:
    return state
  }
}

const sortBlogs = (unsortedList) => {
  const sortedList = unsortedList
  sortedList.sort((a, b) => {return b.likes - a.likes})
  return sortedList
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: [ ...blogs ]
    })
  }
}

export const addBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    newBlog.user = newObject.user
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    blog.likes++
    await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export default blogReducer