const Blog = require('../models/blog')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const fav = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current
  })

  return {
    'title': fav.title,
    'author': fav.author,
    'likes': fav.likes
  }
}

const mostBlogs = (blogs) => {
  var authorsName = blogs[0].author
  var highestBlogCount = 1
  var dict = {}

  //ugly way to do this but it works
  function find(name, count, blogs, dict) {
    for (let i = 0; i<blogs.length; i++) {
      if (dict[blogs[i].author] === undefined) {
        dict[blogs[i].author] = 1
      } else {
        dict[blogs[i].author] += 1
        if (dict[blogs[i].author] > count) {
          name = blogs[i].author
          count = dict[blogs[i].author]
        }
      }
    }
    return {
      'author': name,
      'blogs': count
    }
  }
  const result = find(authorsName, highestBlogCount, blogs, dict)
  return result
}

const mostLikes = (blogs) => {
  var authorsName = blogs[0].author
  var mostLikes = blogs[0].likes
  var dict = {}

  //ugly way to do this but it works
  function find(name, count, blogs, dict) {
    for (let i = 0; i<blogs.length; i++) {
      if (dict[blogs[i].author] === undefined) {
        dict[blogs[i].author] = blogs[i].likes
        if (dict[blogs[i].author] > count) {
          name = blogs[i].author
          count = dict[blogs[i].author]
        }
      } else {
        dict[blogs[i].author] += blogs[i].likes
        if (dict[blogs[i].author] > count) {
          name = blogs[i].author
          count = dict[blogs[i].author]
        }
      }
    }
    return {
      'author': name,
      'likes': count
    }
  }
  const result = find(authorsName, mostLikes, blogs, dict)
  return result
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}
 
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb
}