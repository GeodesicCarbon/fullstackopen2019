// ladataan tarvittavat moduulit
const mongoose = require('mongoose')
const supertest = require('supertest')

// ladataan apumoduuli testejä varten
const helper = require('./test_helper')

// Ladataan tarvittava MongoDB -skeema
const Blog = require('../models/blog')
const User = require('../models/user')

// alustetaan supertestit
const app = require('../app')
const api = supertest(app)

describe('when there are blogs already present', () => {
  // alustetaan testitietokanta esimerkkiolioilla ennen jokaista testiä
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as json objects', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is present', async () => {
    const testBlog = helper.initialBlogs[0]
    const response = await api.get('/api/blogs')

    // poistetaan id-kenttä jotta voidaan tehdä oliovertailu
    response.body.map(b => {delete b.id})
    expect(response.body).toContainEqual(testBlog)
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

    // tarkistetaan, että blogia ei palauteta ennen kuin se on lisätty
    expect(response.body).not.toContainEqual(helper.newBlog)
  })

  describe('adding new blog', () => {
    test('a new valid blog can be added', async () => {
      await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Tarkistetaan, että tietokannan koko on kasvanut yhdellä
      const blogsAfterPost = await helper.blogsInDb()
      expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)

      // tarkistetaan, että tietokantaan lisätty blogi löytyy
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

  describe('deletion of blog', () => {
    test('succeeds with correct id and status 204', async () => {

      const blogs = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .expect(204)
      const blogsAfterDeletion =  await helper.blogsInDb()

      expect(blogsAfterDeletion.length).toBe(helper.initialBlogs.length - 1)
      expect(blogsAfterDeletion).not.toContainEqual(blogs[0])
    })
  })

  describe('modifying a blog', () => {
    test('changing nonexistent blog fails', async () => {
      // get a blog data and delete it to get confirmed non-existent blog
      const response = await api.get('/api/blogs')
      const blogToDelete = response.body[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`)

      await api
        .put(`/api/blogs/${blogToDelete.id}`)
        .send({ likes: 999 })
        .expect(404)

      // Check that no blog has been modified
      const blogsAfterChange = await helper.blogsInDb()
      const likes = blogsAfterChange.map(b => b.likes)
      expect(likes).not.toContain(999)
    })
    test('changing likes succeeds', async () => {
      // kasvatetaan olemassaolevan blogin tykkäyksiä yhdellä ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeLikes = response.body[0]
      blogToChangeLikes.likes = blogToChangeLikes.likes + 1

      await api
        .put(`/api/blogs/${blogToChangeLikes.id}`)
        .send(blogToChangeLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('changing likes returns correct values', async () => {
      // kasvatetaan olemassaolevan blogin tykkäyksiä yhdellä ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeLikes = response.body[0]
      blogToChangeLikes.likes = blogToChangeLikes.likes + 1

      const changedBlog = await api
        .put(`/api/blogs/${blogToChangeLikes.id}`)
        .send(blogToChangeLikes)
      expect(changedBlog.body).toEqual(blogToChangeLikes)

      const blogsAfterChange = await helper.blogsInDb()
      expect(blogsAfterChange.length).toEqual(response.body.length)

      const updatedBlog = blogsAfterChange.find(b => b.id === blogToChangeLikes.id)
      expect(updatedBlog.likes).toBe(blogToChangeLikes.likes)
    })
    test('changing author succeeds', async () => {
      // Vaihdetaan olemassaolevan blogin tekijää ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeAuthor = response.body[0]
      blogToChangeAuthor.author = blogToChangeAuthor.author + ' 2.0'

      await api
        .put(`/api/blogs/${blogToChangeAuthor.id}`)
        .send(blogToChangeAuthor)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('changing author returns correct values', async () => {
      // Vaihdetaan olemassaolevan blogin tekijää ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeAuthor = response.body[0]
      blogToChangeAuthor.author = blogToChangeAuthor.author + ' 2.0'

      const changedBlog = await api
        .put(`/api/blogs/${blogToChangeAuthor.id}`)
        .send(blogToChangeAuthor)
      expect(changedBlog.body).toEqual(blogToChangeAuthor)

      const blogsAfterChange = await helper.blogsInDb()
      expect(blogsAfterChange.length).toEqual(response.body.length)

      const updatedBlog = blogsAfterChange.find(b => b.id === blogToChangeAuthor.id)
      expect(updatedBlog.author).toBe(blogToChangeAuthor.author)
    })
    test('changing title succeeds', async () => {
      // Vaihdetaan olemassaolevan blogin nimeä ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeTitle = response.body[0]
      blogToChangeTitle.title = blogToChangeTitle.title + ' (electric boogaloo)'

      await api
        .put(`/api/blogs/${blogToChangeTitle.id}`)
        .send(blogToChangeTitle)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('changing title returns correct values', async () => {
      // Vaihdetaan olemassaolevan blogin nimeä ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeTitle = response.body[0]
      blogToChangeTitle.title = blogToChangeTitle.title + ' (electric boogaloo)'

      const changedBlog = await api
        .put(`/api/blogs/${blogToChangeTitle.id}`)
        .send(blogToChangeTitle)
      expect(changedBlog.body).toEqual(blogToChangeTitle)

      const blogsAfterChange = await helper.blogsInDb()
      expect(blogsAfterChange.length).toEqual(response.body.length)

      const updatedBlog = blogsAfterChange.find(b => b.id === blogToChangeTitle.id)
      expect(updatedBlog.title).toBe(blogToChangeTitle.title)
    })
    test('changing title to empty should induce validation error', async () => {
      // Vaihdetaan olemassaolevan blogin nimi tyhjäksi ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeTitle = response.body[0]
      blogToChangeTitle.title = ''

      await api
        .put(`/api/blogs/${blogToChangeTitle.id}`)
        .send(blogToChangeTitle)
        .expect(400)
      const blogsAfterChange = await helper.blogsInDb()

      expect(blogsAfterChange.length).toEqual(response.body.length)
      expect(blogsAfterChange).not.toContainEqual(blogToChangeTitle)
    })
    test('changing url succeeds', async () => {
      // Vaihdetaan olemassaolevan blogin osoitetta ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeUrl = response.body[0]
      blogToChangeUrl.url = blogToChangeUrl.url + 'www2/'

      await api
        .put(`/api/blogs/${blogToChangeUrl.id}`)
        .send(blogToChangeUrl)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('changing url returns correct values', async () => {
      // Vaihdetaan olemassaolevan blogin osoitetta ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeUrl = response.body[0]
      blogToChangeUrl.url = blogToChangeUrl.url + 'www2/'

      const changedBlog = await api
        .put(`/api/blogs/${blogToChangeUrl.id}`)
        .send(blogToChangeUrl)
      expect(changedBlog.body).toEqual(blogToChangeUrl)

      const blogsAfterChange = await helper.blogsInDb()
      expect(blogsAfterChange.length).toEqual(response.body.length)

      const updatedBlog = blogsAfterChange.find(b => b.id === blogToChangeUrl.id)
      expect(updatedBlog.url).toBe(blogToChangeUrl.url)
    })
    test('changing url to empty should induce validation error', async () => {
      // Vaihdetaan olemassaolevan blogin osoite tyhjäksi ja tehdään muutos
      // tietokantaan
      const response = await api.get('/api/blogs')
      const blogToChangeUrl = response.body[0]
      blogToChangeUrl.url = ''

      await api
        .put(`/api/blogs/${blogToChangeUrl.id}`)
        .send(blogToChangeUrl)
        .expect(400)
      const blogsAfterChange = await helper.blogsInDb()

      expect(blogsAfterChange.length).toEqual(response.body.length)
      expect(blogsAfterChange).not.toContainEqual(blogsAfterChange)
    })
  })
})

describe('when there is an user already present', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'admin', password: 'admin' })
    await user.save()
  })
  test('accessing all users succeeds', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersInDb = await helper.usersInDb()
    expect(response.body).toContainEqual(usersInDb[0])
  })

  describe('and interacting with new user', () => {
    test('adding new user succeeds', async () => {
      const usersBefore = await helper.usersInDb()

      const newUser = {
        username: 'Hououin Kyoma',
        name: 'Rintaro Okabe',
        password: 'ElPsyCongroo'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length + 1)

      const usernames = usersAfter.map(u => u.username)
      expect(usernames).toContainEqual(newUser.username)

      const names = usersAfter.map(u => u.name)
      expect(names).toContainEqual(newUser.name)
    })

    test('adding new user without username fails', async () => {
      const usersBefore = await helper.usersInDb()

      const newUser = {
        name: 'Rintaro Okabe',
        password: 'ElPsyCongroo'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)

      const names = usersAfter.map(u => u.name)
      expect(names).not.toContainEqual(newUser.name)
    })

    test('adding new user with same username fails', async () => {
      const usersBefore = await helper.usersInDb()
      const userDuplicate = {
        username: usersBefore[0].username,
        password: 'password'
      }

      const result = await api
        .post('/api/users')
        .send(userDuplicate)
        .expect(409)
        .expect('Content-Type', /application\/json/)
      expect(result.body.error).toContain(`username ${usersBefore[0].username} has already been taken`)

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('adding new user with no password fails', async () => {
      const usersBefore = await helper.usersInDb()
      const userNoPassword = {
        username: 'foo',
      }

      const result = await api
        .post('/api/users')
        .send(userNoPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      expect(result.body.error).toContain('`password` is required')

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)

      const usernames = usersAfter.map(u => u.username)
      expect(usernames).not.toContainEqual(userNoPassword.username)
    })

    test('adding new user with password shorter than 3 fails', async () => {
      const usersBefore = await helper.usersInDb()
      const userShortPassword = {
        username: 'foo',
        password: 'ba'
      }

      const result = await api
        .post('/api/users')
        .send(userShortPassword)
        .expect(409)
        .expect('Content-Type', /application\/json/)
      expect(result.body.error).toContain('`password` must be at least 3 charactes long')

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)

      const usernames = usersAfter.map(u => u.username)
      expect(usernames).not.toContainEqual(userShortPassword.username)
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})
