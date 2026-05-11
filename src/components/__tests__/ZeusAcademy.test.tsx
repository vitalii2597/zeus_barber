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
import ZeusAcademy from '../ZeusAcademy'

describe('ZeusAcademy', () => {
  it('renders default heading when content is empty', () => {
    render(<ZeusAcademy content={{}} />)
    expect(screen.getByRole('heading', { name: /zeus academy/i })).toBeInTheDocument()
  })

  it('overrides heading from content prop', () => {
    render(<ZeusAcademy content={{ heading: 'Akademia Mistrzów' }} />)
    expect(screen.getByRole('heading', { name: /akademia mistrzów/i })).toBeInTheDocument()
  })

  it('renders all four default features', () => {
    render(<ZeusAcademy content={{}} />)
    expect(screen.getByText('Kursy podstawowe i zaawansowane')).toBeInTheDocument()
    expect(screen.getByText('Certyfikaty uznawane w branży')).toBeInTheDocument()
    expect(screen.getByText('Małe grupy — maksymalnie 6 osób')).toBeInTheDocument()
    expect(screen.getByText('Nauka na prawdziwych klientach')).toBeInTheDocument()
  })

  it('renders statistics', () => {
    render(<ZeusAcademy content={{}} />)
    expect(screen.getByText('3+')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('renders founder quote', () => {
    render(<ZeusAcademy content={{}} />)
    expect(screen.getByText(/barberstwo to nie tylko zawód/i)).toBeInTheDocument()
  })
})
