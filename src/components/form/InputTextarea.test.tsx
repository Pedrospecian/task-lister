import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputTextarea from './InputTextarea'

describe('InputTextarea', () => {
  it('Renders a label equal to the input via htmlFor/id', () => {
    render(<InputTextarea id="description" label="Description" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('Forwards typed input via onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<InputTextarea id="description" label="Description" value="" onChange={handleChange} />)

    await user.type(screen.getByLabelText('Description'), 'a')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('Shows the error message and applies the field-error class when error is set', () => {
    render(
      <InputTextarea
        id="description"
        label="Description"
        value=""
        onChange={() => {}}
        error="Required field"
      />,
    )

    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toHaveClass('field-error')
  })
})
