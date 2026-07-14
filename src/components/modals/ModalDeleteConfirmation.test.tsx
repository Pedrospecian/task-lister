import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalDeleteConfirmation from './ModalDeleteConfirmation'
import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'
import type { TodoForm } from '../../interfaces/todo';

const itemToBeDeleted: TodoForm = {
  id: 7,
  title: 'Existing',
  description: 'Existing desc',
  completed: false,
  createdAt: '14/07/2026 10:43:15',
  errors: {
    title: '',
    description: ''
  },
}

beforeEach(() => {
  useModalStore.setState({ modalConfirmIsOpen: true })
  useTodoStore.setState({ todos: [] })
  useTodoFormStore.setState({ todoForm: itemToBeDeleted })
})

describe('ModalDeleteConfirmation', () => {
  it('closes the modal upon clicking the "Cancel" button', async () => {
    const user = userEvent.setup()
    render(<ModalDeleteConfirmation />)

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(useModalStore.getState().modalConfirmIsOpen).toBe(false)
  })

  it('deletes the item upon clicking the "Confirm" button', async () => {
    const user = userEvent.setup()
    render(<ModalDeleteConfirmation />)

    await user.click(screen.getByRole('button', { name: 'Confirm' }))

    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(0)
    expect(useModalStore.getState().modalConfirmIsOpen).toBe(false)
  })

})
