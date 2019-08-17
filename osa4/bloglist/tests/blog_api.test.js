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
  test('A blog with no title will not be added', async () => {
    const noTitle = {
      author: 'no title',
      url: 'http://notitle/'
    }
    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length)
    expect(blogsAfterPost.find(b => b.author === noTitle.author)).toBe(undefined)
  })
  test('A blog with no url will not be added', async () => {
    const noUrl = {
      author: 'No Url',
      title: 'no url'
    }
    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length)
    expect(blogsAfterPost.find(b => b.author === noUrl.author)).toBe(undefined)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
