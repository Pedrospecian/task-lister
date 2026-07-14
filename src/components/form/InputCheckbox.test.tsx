import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputCheckbox from './InputCheckbox'

describe('InputCheckbox', () => {
  it('Renders a label wired to the checkbox via htmlFor/id', () => {
    render(<InputCheckbox id="done-1" label="Done" value={false} onChange={() => {}} />)
    expect(screen.getByLabelText('Done')).toBeInTheDocument()
  })

  it('Reflects the checked state from the value prop', () => {
    render(<InputCheckbox id="done-1" label="Done" value={true} onChange={() => {}} />)
    expect(screen.getByLabelText('Done')).toBeChecked()
  })

  it('Calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<InputCheckbox id="done-1" label="Done" value={false} onChange={handleClick} />)

    await user.click(screen.getByLabelText('Done'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
