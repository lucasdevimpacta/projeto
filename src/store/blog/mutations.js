import Blog from '../model/Blog'

export function UPDATE_BLOG (state, payload) {
  state.data = [];
  state.data = payload.data.map( blog => new Blog.buildBlog(blog));
}