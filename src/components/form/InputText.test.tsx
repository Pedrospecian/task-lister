import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InputText from './InputText'

describe('InputText', () => {
  it('Renders a label equal to the input via htmlFor/id', () => {
    render(<InputText id="title" type="text" label="Title" value="" onChange={() => {}} />)

    const input = screen.getByLabelText('Title')
    expect(input).toBeInTheDocument()
  })

  it('Renders no label element when no label is provided', () => {
    render(<InputText id="title" type="text" value="" onChange={() => {}} />)
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
  })

  it('shows the error message and applies the field-error class when error is set', () => {
    render(
      <InputText
        id="title"
        label="Title"
        value=""
        type="text"
        onChange={() => {}}
        error="Required field"
        className="input-field"
      />,
    )

    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveClass('field-error')
  })

  it('Does not show error message when there is no error', () => {
    render(<InputText id="title" type="text" label="Title" value="" onChange={() => {}} />)
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument()
  })
})
