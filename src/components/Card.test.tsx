import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'
import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'
import useTodoFormStore from '../store/useTodoFormStore'

const item = {
  id: 1,
  title: 'Fix bug #558',
  description: 'Fix the bug in the contact listing page',
  created_at: '14/07/2026, 09:36:27',
  completed: false,
}

beforeEach(() => {
  useModalStore.setState({ modalIsOpen: false })
  useTodoStore.setState({ todos: [item] })
  useTodoFormStore.setState({
    todoForm: {
      id: 0,
      title: '',
      description: '',
      created_at: null,
      completed: false,
      errors: {
        title: '',
        description: ''
      }
    },
  })
})

describe('Card', () => {
  it('Renders the title, description, and creation date', () => {
    render(<Card item={item} />)

    expect(screen.getByText('Fix bug #558')).toBeInTheDocument()
    expect(screen.getByText('Fix the bug in the contact listing page')).toBeInTheDocument()
    expect(screen.getByText(/Created at 14\/07\/2026/)).toBeInTheDocument()
  })

  it('Reflects the completed state in the "Done" checkbox', () => {
    render(<Card item={{ ...item, completed: true }} />)
    expect(screen.getByLabelText('Done')).toBeChecked()
  })

  it('Toggles completion in the todo store by clicking "Done"', async () => {
    const user = userEvent.setup()

    render(<Card item={item} />)

    await user.click(screen.getByLabelText('Done'))

    expect(useTodoStore.getState().todos.find((t) => t.id === 1)?.completed).toBe(true)
  })

  it('Removes the item from the todo store by clicking "Delete"', async () => {
    const user = userEvent.setup()
    render(<Card item={item} />)

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(useTodoStore.getState().todos.find((t) => t.id === 1)).toBeUndefined()
  })

  it('Loads the item into the form store and opens the modal by clicking "Edit"', async () => {
    const user = userEvent.setup()
    render(<Card item={item} />)

    await user.click(screen.getByRole('button', { name: 'Edit' }))

    expect(useTodoFormStore.getState().todoForm).toMatchObject({
      id: 1,
      title: 'Fix bug #558',
      description: 'Fix the bug in the contact listing page',
    })
    expect(useModalStore.getState().modalIsOpen).toBe(true)
  })
})
