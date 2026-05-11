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
import Services from '../Services'
import type { Service } from '@/lib/supabase/types'

const mockServices: Service[] = [
  { id: '1', name: 'Testowe Strzyżenie', description: 'Klasyczny styl', price: 55, duration_min: 30, active: true, sort_order: 1 },
  { id: '2', name: 'Testowa Broda', description: null, price: 35, duration_min: 20, active: true, sort_order: 2 },
  { id: '3', name: 'Nieaktywna Usługa', description: null, price: 10, duration_min: 10, active: false, sort_order: 3 },
]

describe('Services', () => {
  it('renders services from props', () => {
    render(<Services services={mockServices} content={{}} />)
    expect(screen.getByText('Testowe Strzyżenie')).toBeInTheDocument()
    expect(screen.getByText('Testowa Broda')).toBeInTheDocument()
  })

  it('displays price in złoty and duration in minutes', () => {
    render(<Services services={mockServices} content={{}} />)
    expect(screen.getByText('55 zł')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('does not render inactive services', () => {
    render(<Services services={mockServices} content={{}} />)
    expect(screen.queryByText('Nieaktywna Usługa')).not.toBeInTheDocument()
  })

  it('uses built-in fallback services when an empty array is passed', () => {
    render(<Services services={[]} content={{}} />)
    expect(screen.getByText('Strzyżenie')).toBeInTheDocument()
    expect(screen.getByText('60 zł')).toBeInTheDocument()
  })

  it('renders optional description when present', () => {
    render(<Services services={mockServices} content={{}} />)
    expect(screen.getByText('Klasyczny styl')).toBeInTheDocument()
  })
})
