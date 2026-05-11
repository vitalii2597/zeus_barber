vi.mock('gsap', () => ({
  gsap: {
    from: vi.fn(),
    to: vi.fn(),
    context: vi.fn((fn: () => void) => { fn(); return { revert: vi.fn() } }),
    registerPlugin: vi.fn(),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { render, screen } from '@testing-library/react'
import Rezerwacja from '../Rezerwacja'

describe('Rezerwacja', () => {
  it('renders the booking heading', () => {
    render(<Rezerwacja content={{}} />)
    expect(screen.getByRole('heading', { name: /zarezerwuj wizytę/i })).toBeInTheDocument()
  })

  it('has a Booksy link that opens in a new tab', () => {
    render(<Rezerwacja content={{}} />)
    const link = screen.getByRole('link', { name: /booksy/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('href', expect.stringContaining('booksy.com'))
  })

  it('has a clickable phone link', () => {
    render(<Rezerwacja content={{}} />)
    const phone = screen.getByRole('link', { name: /452 353 324/ })
    expect(phone).toHaveAttribute('href', 'tel:452353324')
  })
})
