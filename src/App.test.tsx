import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import useTodoStore from './store/useTodoStore'
import useModalStore from './store/useModalStore'
import useTodoFormStore from './store/useTodoFormStore'

beforeEach(() => {
  useTodoStore.setState({ todos: [] })
  useModalStore.setState({ modalIsOpen: false })
  useTodoFormStore.setState({
    todoForm: {
      id: 0,
      title: '',
      description: '',
      createdAt: null,
      completed: false,
      errors: {
        title: '',
        description: ''
      }
    },
  })
})

describe('App', () => {
  it('Shows an empty-state message when there are no items', () => {
    render(<App />)
    expect(screen.getByText('No items added yet')).toBeInTheDocument()
  })

  it('Renders one card for each item in the store', () => {
    useTodoStore.setState({
      todos: [
        {
          id: 1,
          title: 'Fix bug #540',
          description: 'Fix the bug in the contact creation page',
          completed: false,
          createdAt: 'now'
        },
        {
          id: 2,
          title: 'Implement facial recognition system',
          description: 'Implement the new facial recognition system, which must reduce the overall proccessing time',
          completed: true,
          createdAt: 'now'
        },
      ],
    })
    render(<App />)

    expect(screen.getByText('Fix bug #540')).toBeInTheDocument()
    expect(screen.getByText('Implement facial recognition system')).toBeInTheDocument()
  })

  it('Filters cards by title', async () => {
    useTodoStore.setState({
      todos: [
        {
          id: 1,
          title: 'Fix bug #540',
          description: 'Fix the bug in the contact creation page',
          completed: false,
          createdAt: 'now'
        },
        {
          id: 2,
          title: 'Implement facial recognition system',
          description: 'Implement the new facial recognition system, which must reduce the overall proccessing time',
          completed: false,
          createdAt: 'now'
        },
      ],
    })
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search'), 'bug')

    expect(screen.getByText('Fix bug #540')).toBeInTheDocument()
    expect(screen.queryByText('Implement facial recognition system')).not.toBeInTheDocument()
  })

  it('Shows a "no match" message when no items match the search filters', async () => {
    useTodoStore.setState({
      todos: [
        {
          id: 1,
          title: 'Fix bug #540',
          description: 'Fix the bug in the contact creation page',
          completed: false,
          createdAt: 'now'
        }
      ],
    })
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Search'), 'nonexistent')

    expect(screen.getByText('No items match the specified search criteria')).toBeInTheDocument()
  })

  it('Ensures that the form is blank when the "+ New item" button is clicked', async () => {
    useTodoFormStore.setState({
      todoForm: {
        id: 54,
        title: 'Lingering data',
        description: 'Lingering data from a previously editted todo item',
        createdAt: null,
        completed: false,
        errors: {
          title: '',
          description: ''
        }
      },
    })
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '+ New item' }))

    expect(screen.getByText('Create item')).toBeInTheDocument()
    expect(useTodoFormStore.getState().todoForm.title).toBe('')
  })

  it('Tests the full todo item creation flow', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '+ New item' }))
    await user.type(screen.getByLabelText('Title'), 'Fix bug #540')
    await user.type(screen.getByLabelText('Description'), 'Fix the bug in the contact creation page')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(screen.getByText('Fix bug #540')).toBeInTheDocument()
    expect(screen.queryByText('Create item')).not.toBeInTheDocument()
  })
});