const listHelper = require('../utils/list_helper')
const { allBlogs, oneBlog, noBlogs } = require('./blog_list')

describe('dummy test', () => {
  test('returns always one', () => {
    const result = listHelper.dummy()
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when given an empty list of blogs is zero', () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })

  test('when given a single blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(2)
  })


  test('when given a list of multiple blogs', () => {
    const result = listHelper.totalLikes(allBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('when given an empty list of blogs is null', () => {
    const result = listHelper.favouriteBlog(noBlogs)
    expect(result).toEqual(null)
  })

  test('when given a list of blogs', () => {
    const result = listHelper.favouriteBlog(allBlogs)
    const expected = {
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'likes': 12,
    }
    expect(result).toEqual(expected)
  })
})

describe('blogger with most blogs', () => {
  test('in a list of blogs', () => {
    const result = listHelper.mostBlogs(allBlogs)
    const expected = {
      'author': 'Robert C. Martin',
      'blogs': 3
    }
    expect(result).toEqual(expected)
  })
})

describe('blogger with most likes', () => {
  test('in a list of blogs', () => {
    const result = listHelper.mostLikes(allBlogs)
    const expected = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }
    expect(result).toEqual(expected)
  })
})