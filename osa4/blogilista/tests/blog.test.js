const listHelper = require('../utils/list_helper')

const blogs = [
  {
    'title': 'Day in a life',
    'author': 'Valtteri Ahola',
    'url': 'www.osoite.fi',
    'likes': 678,
    'id': '63ebbc36ee93eeed18f32caa'
  },
  {
    'title': 'Deep thoughts',
    'author': 'Mr Bean',
    'url': 'www.address.com',
    'likes': 543,
    'id': '63ebc49ed2e7c1840c93a514'
  },
  {
    'title': 'Something something',
    'author': 'Napoleon',
    'url': 'www.address.com',
    'likes': 543,
    'id': '63ebc6fed3f51b393b468d89'
  },
  {
    'title': 'Its my life',
    'author': 'J.B. Jovi',
    'url': 'www.abc.com',
    'likes': 123,
    'id': '63ec905ed8f79bccc2a0f0bf'
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('total likes of blogs', () => {
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(1887)
})