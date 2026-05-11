import { render, screen } from '@testing-library/react'
import SkipLink from '../SkipLink'

describe('SkipLink', () => {
  it('renders a link pointing to #main-content', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '#main-content')
  })

  it('displays the correct label text', () => {
    render(<SkipLink />)
    expect(screen.getByText('Przejdź do treści')).toBeInTheDocument()
  })
})
