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
import ScrollReveal from '../ScrollReveal'

describe('ScrollReveal', () => {
  it('renders its children', () => {
    render(<ScrollReveal><p>Inner content</p></ScrollReveal>)
    expect(screen.getByText('Inner content')).toBeInTheDocument()
  })

  it('forwards className and style props to the wrapper element', () => {
    const { container } = render(
      <ScrollReveal className="my-class" style={{ opacity: 0.5 }}>
        <span>Child</span>
      </ScrollReveal>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('my-class')
    expect(wrapper.style.opacity).toBe('0.5')
  })
})
