vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    from: vi.fn(),
    context: vi.fn((fn: () => void) => { fn(); return { revert: vi.fn() } }),
    registerPlugin: vi.fn(),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'

// The hamburger button has display:none via inline style (shown only by CSS media query).
// jsdom doesn't apply media queries, so we use { hidden: true } and fireEvent to interact with it.
function getHamburger() {
  return screen.getByRole('button', { hidden: true })
}

describe('Navbar', () => {
  it('renders the ZEUS logo', () => {
    render(<Navbar />)
    expect(screen.getByText('ZEUS')).toBeInTheDocument()
  })

  it('renders all four navigation links', () => {
    render(<Navbar />)
    expect(screen.getAllByRole('link', { name: /rezerwacja/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /galeria/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /academy/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /kontakt/i }).length).toBeGreaterThan(0)
  })

  it('renders a Booksy link that opens in a new tab', () => {
    render(<Navbar />)
    const booksyLinks = screen.getAllByRole('link', { name: /booksy/i })
    expect(booksyLinks[0]).toHaveAttribute('target', '_blank')
    expect(booksyLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('hamburger starts closed, opens on click, closes on second click', () => {
    render(<Navbar />)
    const btn = getHamburger()

    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveAttribute('aria-label', 'Otwórz menu')

    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(btn).toHaveAttribute('aria-label', 'Zamknij menu')

    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveAttribute('aria-label', 'Otwórz menu')
  })

  it('backdrop is absent when closed and clicking it closes the menu', () => {
    const { container } = render(<Navbar />)
    const btn = getHamburger()

    // No backdrop when menu is closed
    expect(container.querySelector('[style*="z-index: 98"]')).toBeNull()

    fireEvent.click(btn)
    // Backdrop renders (z-index 98 is unique to it)
    const backdrop = container.querySelector('[style*="z-index: 98"]')
    expect(backdrop).toBeInTheDocument()

    // Clicking the backdrop closes the menu
    fireEvent.click(backdrop!)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })
})
