import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectField from './SelectField'

const options = [
  { value: 1, label: 'Title' },
  { value: 2, label: 'Description' },
]

describe('SelectField', () => {
  it('Renders an option for every entry in options', () => {
    render(<SelectField id="criterion" label="Criterion" value={1} onChange={() => {}} options={options} />)

    expect(screen.getByRole('option', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Description' })).toBeInTheDocument()
  })

  it('Reflects the selected value', () => {
    render(<SelectField id="criterion" label="Criterion" value={2} onChange={() => {}} options={options} />)
    expect(screen.getByLabelText('Criterion')).toHaveValue('2')
  })

  it('Calls onChange when the user chooses a different option', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SelectField id="criterion" label="Criterion" value={1} onChange={handleChange} options={options} />)

    await user.selectOptions(screen.getByLabelText('Criterion'), 'Description')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
