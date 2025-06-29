import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: 'small' | 'large'
}

const Button = ({ 
  children, 
  onClick,
  size
}: ButtonProps) => {
  const className = ['button']
  if (size) {
    className.push(`button--${size}`)
  }

  return (
    <button 
      className={className.join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
