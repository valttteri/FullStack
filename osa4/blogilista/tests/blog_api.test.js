const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const { allBlogs, oneBlog, noBlogs } = require('./blog_list')
const helper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(allBlogs)
})

test('blogs are returned as json', async () => {
  const res = await api.get('/api/blogs')

  expect(res.statusCode).toBe(200)
  expect(res.type).toBe('application/json')
  expect(res.body.length).toBe(allBlogs.length)
})

test('blogs have an id', async () => {
  const res = await api.get('/api/blogs')
  res.body.map(blog => expect(blog.id).toBeDefined())
})

test('a new blog can be created properly', async () => {
  const testBlog = {
    title: 'Absolute nonsense',
    author: 'Average Joe',
    url: 'http://www.123.com',
    likes: 56
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const titles = res.body.map(blog => blog.title)

  expect(res.body).toHaveLength(allBlogs.length + 1)
  expect(titles).toContain('Absolute nonsense')
})

test('if likes receives no value, a default value of zero is set', async () => {
  const noLikes = {
    title: 'Cool facts and stuff',
    author: 'Jane Doe',
    url: 'http://www.123.com'
  }

  await api
    .post('/api/blogs')
    .send(noLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const newBlog = res.body[res.body.length-1]
  expect(newBlog.likes).toBe(0)
})

test('test for missing content', async () => {
  const noTitle = {
    author: 'Jane Doe',
    url: 'http://www.123.com',
    likes: 23
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body).toHaveLength(
    allBlogs.length - 1
  )

  expect(blogsAtEnd.body).not.toContain(blogToDelete)
})

test('a blog can be updated', async () => {
  const blogToUpdate = {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 30
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send( { likes: blogToUpdate.likes } )
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id)

  expect(updatedBlog[0].likes).toBe(blogToUpdate.likes)
})

afterAll(async () => {
  await mongoose.connection.close()
})
