import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the header with title and subtitle', () => {
    render(<Header />)
    
    expect(screen.getByText('UI Reference Apps')).toBeInTheDocument()
    expect(screen.getByText('Vite + React Client-Side Rendering')).toBeInTheDocument()
  })

  it('has the correct CSS class', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('header')
  })

  it('contains a container div', () => {
    render(<Header />)
    
    const container = screen.getByText('UI Reference Apps').parentElement
    expect(container).toHaveClass('container')
  })
}) 