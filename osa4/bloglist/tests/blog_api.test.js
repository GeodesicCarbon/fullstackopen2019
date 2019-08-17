const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blogs api', () => {
  test('blogs are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blog has an "id" field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('all blogs have an "id" field', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(b => b.id)
    expect(blogs).not.toContain(undefined)
  })

  test('an nonexitent blog cannot be found', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).not.toContainEqual(helper.newBlog)
  })

  test('a new valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogsAfterPost.map(b => b.title)
    expect(titles).toContainEqual(helper.newBlog.title)
  })

  test('blog with no "likes" field will have a value of 0', async () => {
    const unlikedBlog = {
      author: 'foo',
      title: 'bar',
      url: 'http://foobar.baz/'
    }
    await api
      .post('/api/blogs')
      .send(unlikedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)
    expect(blogsAfterPost.find(b => b.author === 'foo').likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
