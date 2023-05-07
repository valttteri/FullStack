import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component tests', () => {

  test('A new blog is submitted with the right info', async () => {
    const user = userEvent.setup()
    const addPost = jest.fn()
    const mockHandler = jest.fn()

    render(<BlogForm addPost={addPost} handlePostCreating={mockHandler}/>)

    const titleInput = screen.getByPlaceholderText('add title')
    const authorInput = screen.getByPlaceholderText('add author')
    const urlInput = screen.getByPlaceholderText('add url')
    const createButton = screen.getByText('create')

    await userEvent.type(titleInput, 'blogi')
    await userEvent.type(authorInput, 'mikko')
    await userEvent.type(urlInput, 'www.url.fi')
    await userEvent.click(createButton)

    expect(addPost.mock.calls).toHaveLength(1)
    expect(addPost.mock.calls[0][0]).toBe('blogi')
    expect(addPost.mock.calls[0][1]).toBe('mikko')
    expect(addPost.mock.calls[0][2]).toBe('www.url.fi')
  })
})