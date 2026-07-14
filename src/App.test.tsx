import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import useTodoStore from './store/useTodoStore'
import useModalStore from './store/useModalStore'
import useTodoFormStore from './store/useTodoFormStore'

beforeEach(() => {
  useTodoStore.setState({ todos: [] })
})

describe('App', () => {
  it('Shows an empty-state message when there are no items', () => {
    render(<App />)
    expect(screen.getByText('No items added yet')).toBeInTheDocument()
  })
});