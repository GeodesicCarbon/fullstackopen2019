const blogs = [
  {
    likes: 3,
    title: 'aaa',
    author: 'bbb',
    url: 'ccc',
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d5f23301411a21b5e9ab919'
    },
    id: '5d5f23761411a21b5e9ab91a'
  },
  {
    likes: 335,
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter',
    url: 'http://localhost:3001/api/blogs',
    user: {
      username: 'foo',
      name: 'Foo Bar',
      id: '5e00fc6938f387025042df7e'
    },
    id: '5e01107a1d9e9f0300536dc6'
  },
  {
    likes: 0,
    title: '5.3 test 2',
    author: 'bbbb',
    url: 'asdf',
    user: {
      username: 'foo',
      name: 'Foo Bar',
      id: '5e00fc6938f387025042df7e'
    },
    id: '5e04d5df67c2c30a620469f8'
  },
  {
    likes: 2,
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter',
    url: 'http://localhost:3003/api/blogs',
    user: {
      username: 'foo',
      name: 'Foo Bar',
      id: '5e00fc6938f387025042df7e'
    },
    id: '5e051b00e766a90cbb43d6cd'
  },
  {
    likes: 2,
    title: '5.9 test one',
    author: 'Douglas Hofstadter',
    url: 'http://localhost:3003/api/blogs',
    user: {
      username: 'foo',
      name: 'Foo Bar',
      id: '5e00fc6938f387025042df7e'
    },
    id: '5e054024a1888b0d480b0701'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
export default { getAll }
