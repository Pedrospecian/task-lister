import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalItemCreation from './ModalItemCreation'
import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'

const emptyForm = {
  id: 0,
  title: '',
  description: '',
  created_at: null,
  completed: false,
  errors: {
    title: '',
    description: ''
  },
}

beforeEach(() => {
  useModalStore.setState({ modalIsOpen: true })
  useTodoStore.setState({ todos: [] })
  useTodoFormStore.setState({ todoForm: emptyForm })
})

describe('ModalItemCreation', () => {
  it('shows "Create item" for a brand-new (id: 0) form', () => {
    render(<ModalItemCreation />)
    expect(screen.getByText('Create item')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })

  it('shows "Edit item" when the form was loaded from an existing todo', () => {
    useTodoFormStore.setState({
      todoForm: {
        ...emptyForm,
        id: 7,
        title: 'Existing',
        description: 'Existing desc'
      },
    })
    render(<ModalItemCreation />)
    expect(screen.getByText('Edit item')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  it('typing updates the form store', async () => {
    const user = userEvent.setup()
    render(<ModalItemCreation />)

    await user.type(screen.getByLabelText('Title'), 'a')
    expect(useTodoFormStore.getState().todoForm.title).toBe('a')
  })

  it('blocks submission and shows errors when title and description are empty', async () => {
    const user = userEvent.setup()
    render(<ModalItemCreation />)

    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(screen.getAllByText('Required field')).toHaveLength(2)
    expect(useTodoStore.getState().todos).toHaveLength(0)
    expect(useModalStore.getState().modalIsOpen).toBe(true)
  })

  it('adds a new todo and closes the modal on valid submission', async () => {
    const user = userEvent.setup()
    render(<ModalItemCreation />)

    await user.type(screen.getByLabelText('Title'), 'Buy milk')
    await user.type(screen.getByLabelText('Description'), 'Whole milk, 1L')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(1)
    expect(todos[0]).toMatchObject({ title: 'Buy milk', description: 'Whole milk, 1L' })
    expect(useModalStore.getState().modalIsOpen).toBe(false)
  })

  it('edits an existing todo instead of creating a new one when form has an id', async () => {
    useTodoStore.setState({
      todos: [{ id: 7, title: 'Existing', description: 'Existing desc', completed: false }],
    })
    useTodoFormStore.setState({
      todoForm: { ...emptyForm, id: 7, title: 'Existing', description: 'Existing desc' },
    })
    const user = userEvent.setup()
    render(<ModalItemCreation />)

    const titleInput = screen.getByLabelText('Title')
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated title')
    await user.click(screen.getByRole('button', { name: 'Edit' }))

    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(1)
    expect(todos[0].title).toBe('Updated title')
  })
})
