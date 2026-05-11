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
import Kontakt from '../Kontakt'

describe('Kontakt', () => {
  it('renders a phone link', () => {
    render(<Kontakt content={{}} />)
    const phone = screen.getByRole('link', { name: /Telefon: 452 353 324/ })
    expect(phone).toHaveAttribute('href', 'tel:452353324')
  })

  it('renders an Instagram link that opens in a new tab', () => {
    render(<Kontakt content={{}} />)
    // Component renders Instagram in both contact block and footer
    const igLinks = screen.getAllByRole('link', { name: /instagram/i })
    expect(igLinks.length).toBeGreaterThan(0)
    igLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('href', expect.stringContaining('instagram.com'))
    })
  })

  it('renders the default founder name when not set in content', () => {
    render(<Kontakt content={{}} />)
    expect(screen.getByText('Oleh Gonipirenko')).toBeInTheDocument()
  })

  it('renders founder name from content when provided', () => {
    render(<Kontakt content={{ founder_name: 'Jan Kowalski' }} />)
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
  })

  it('shows the address when provided in content', () => {
    render(<Kontakt content={{ address: 'ul. Testowa 1, Lublin' }} />)
    expect(screen.getByText('ul. Testowa 1, Lublin')).toBeInTheDocument()
    expect(screen.getByText('Adres')).toBeInTheDocument()
  })

  it('does not show the address block when address is absent', () => {
    render(<Kontakt content={{}} />)
    expect(screen.queryByText('Adres')).not.toBeInTheDocument()
  })

  it('renders the booking CTA link', () => {
    render(<Kontakt content={{}} />)
    const booksyLinks = screen.getAllByRole('link', { name: /zarezerwuj/i })
    expect(booksyLinks.length).toBeGreaterThan(0)
    expect(booksyLinks[0]).toHaveAttribute('href', expect.stringContaining('booksy.com'))
  })
})
