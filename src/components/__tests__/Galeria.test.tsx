vi.mock('gsap', () => ({
  gsap: {
    from: vi.fn(),
    to: vi.fn(),
    context: vi.fn((fn: () => void) => { fn(); return { revert: vi.fn() } }),
    registerPlugin: vi.fn(),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

import { render, screen } from '@testing-library/react'
import Galeria, { GaleriaSkeleton } from '../Galeria'
import type { GalleryImage } from '@/lib/supabase/types'

const mockImages: GalleryImage[] = [
  { id: '1', url: 'https://example.com/a.jpg', storage_path: 'a.jpg', alt: 'Strzyżenie 1', sort_order: 1, created_at: '' },
  { id: '2', url: 'https://example.com/b.jpg', storage_path: 'b.jpg', alt: 'Strzyżenie 2', sort_order: 2, created_at: '' },
  { id: '3', url: 'https://example.com/c.jpg', storage_path: 'c.jpg', alt: null,           sort_order: 3, created_at: '' },
]

describe('Galeria', () => {
  it('has the correct section id', () => {
    const { container } = render(<Galeria images={[]} content={{}} />)
    expect(container.querySelector('#galeria')).toBeInTheDocument()
  })

  it('renders 9 placeholder SVGs when no images are provided', () => {
    const { container } = render(<Galeria images={[]} content={{}} />)
    expect(container.querySelectorAll('svg').length).toBe(9)
  })

  it('renders images when provided', () => {
    render(<Galeria images={mockImages} content={{}} />)
    expect(screen.getByAltText('Strzyżenie 1')).toBeInTheDocument()
    expect(screen.getByAltText('Strzyżenie 2')).toBeInTheDocument()
  })

  it('falls back to default alt text when alt is null', () => {
    render(<Galeria images={mockImages} content={{}} />)
    expect(screen.getByAltText('Zeus Barber Shop')).toBeInTheDocument()
  })

  it('links to the Instagram profile', () => {
    render(<Galeria images={[]} content={{}} />)
    const igLink = screen.getByRole('link', { name: /@zeus_hairdress/i })
    expect(igLink).toHaveAttribute('href', expect.stringContaining('instagram.com'))
  })
})

describe('GaleriaSkeleton', () => {
  it('renders 8 skeleton placeholder cells', () => {
    const { container } = render(<GaleriaSkeleton />)
    expect(container.querySelectorAll('.skeleton-cell').length).toBe(8)
  })
})
