const listHelper = require('../utils/list_helper')
// testiblogit haettu osoitteesta
// https://github.com/fullstackopen-2019/misc/blob/master/blogs_for_test.md

const mostLiked1 = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}

const mostLiked2 = {
  _id: '5a422b3a1b54a676234d17f8',
  title: 'foo',
  author: 'baz',
  url: 'bar',
  likes: 12,
  __v: 0
}

const secondMostLiked =   {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
}

const blogsStart = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogsEnd = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]


// 4.3
test('dummy returns one', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})

// 4.4
describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('of one blog is likes of that blog', () => {
    expect(listHelper.totalLikes([mostLiked1])).toBe(12)
  })

  test('of unliked blog to be zero', () => {
    const blogs = [
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      }
    ]
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('of many blogs to be sum of individual blogs', () => {
    const blogs = blogsStart.concat(blogsEnd.concat([mostLiked1]))
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('of many blogs not dependent on the order of blogs', () => {
    const blogs = [mostLiked1].concat(blogsEnd.concat(blogsStart))
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

// 4.5
describe('favorite blog', () => {
  test('of empty list should be null', () => {
    const blogs = []
    expect(listHelper.favoriteBlog(blogs)).toBe(null)
  })

  test('of single blog should be that blog', () => {
    const blog = mostLiked1
    expect(listHelper.favoriteBlog([blog])).toEqual(blog)
  })

  test('of single blog not dependent on blog', () => {
    const blog = secondMostLiked
    expect(listHelper.favoriteBlog([blog])).toEqual(blog)
  })

  test('of many blogs to be the blog with highest likes', () => {
    const blogs = blogsStart.concat(blogsEnd.concat([mostLiked1]))
    expect(listHelper.favoriteBlog(blogs)).toEqual(mostLiked1)
  })

  test('of many blogs to not be dependent on list order', () => {
    const blogs = blogsEnd.concat([mostLiked1].concat(blogsStart))
    expect(listHelper.favoriteBlog(blogs)).toEqual(mostLiked1)
  })

  test('of multiple equally liked blogs to be one of them', () => {
    const blogs = blogsStart.concat(blogsEnd.concat([mostLiked1].concat([mostLiked2])))
    expect([mostLiked1, mostLiked2]).toContain(listHelper.favoriteBlog(blogs))
  })

  test('of multiple equally liked blogs not dependent on order', () => {
    const blogs = [mostLiked2].concat(blogsStart.concat([mostLiked1].concat(blogsEnd)))
    expect([mostLiked1, mostLiked2]).toContain(listHelper.favoriteBlog(blogs))
  })
})
