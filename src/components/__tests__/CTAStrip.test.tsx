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
import CTAStrip from '../CTAStrip'

describe('CTAStrip', () => {
  it('renders all four CTA card titles', () => {
    render(<CTAStrip />)
    expect(screen.getByText('Zarezerwuj wizytę')).toBeInTheDocument()
    expect(screen.getByText('Nasze usługi')).toBeInTheDocument()
    expect(screen.getByText('Zeus Academy')).toBeInTheDocument()
    expect(screen.getByText('Nasze prace')).toBeInTheDocument()
  })

  it('renders all four descriptions', () => {
    render(<CTAStrip />)
    expect(screen.getByText('Online przez Booksy — 24/7')).toBeInTheDocument()
    expect(screen.getByText('Strzyżenie, broda i więcej')).toBeInTheDocument()
    expect(screen.getByText('Kursy dla barberów')).toBeInTheDocument()
    expect(screen.getByText('Każdy włos to dzieło sztuki')).toBeInTheDocument()
  })

  it('the Booksy card opens in a new tab', () => {
    render(<CTAStrip />)
    const booksyCard = screen.getByRole('link', { name: /zarezerwuj wizytę/i })
    expect(booksyCard).toHaveAttribute('target', '_blank')
    expect(booksyCard).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('internal cards do not open in a new tab', () => {
    render(<CTAStrip />)
    const servicesCard = screen.getByRole('link', { name: /nasze usługi/i })
    expect(servicesCard).not.toHaveAttribute('target')
  })
})
