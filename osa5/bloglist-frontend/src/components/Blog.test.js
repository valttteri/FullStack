import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
  const blog = {
    title: 'testi',
    author: 'mikko',
    url: 'www.url.com',
    likes: 123,
    id: '1234',
    user: {
      username: 'mikko'
    }
  }

  const user = {
    username: 'mikko'
  }

  const clickHandler = jest.fn()
  const likeHandler = jest.fn()
  const addLike = jest.fn()

  beforeEach(() => {
    render(
      <Blog key={blog.id} user={user} blog={blog} clickHandler={clickHandler} likeHandler={likeHandler} addLike={addLike} />
    )
  })

  test('only title is rendered by default', () => {

    const title = screen.getByText('testi')
    const author = screen.queryByText('mikko')
    const url = screen.queryByText('www.url.com')
    const likes = screen.queryByText(123)
    const id = screen.queryByText('1234')
    const user = screen.queryByText('5678')

    expect(title).toBeDefined()
    expect(author).toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(id).toBeNull()
    expect(user).toBeNull()
  })

  test('pressing "show"-button renders all blog info', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const title = screen.getByText('testi')
    const author = screen.queryByText('mikko')
    const url = screen.queryByText('www.url.com')
    const likes = screen.queryByText(123)

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })

  test('clicking like twice calls the event handler twice', async () => {

    const user = userEvent.setup()
    const show = screen.getByText('show')
    await user.click(show)

    const like = screen.getByText('like')

    await user.click(like)
    await user.click(like)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})