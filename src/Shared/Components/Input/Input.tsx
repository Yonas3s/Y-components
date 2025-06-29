import './Input.css'    

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  size?: 'small' | 'large'
  label?: string
}

const Input = ({ 
  placeholder, 
  value, 
  onChange,
  size,
  label 
}: InputProps) => {
  const className = ['input']
  if (size) {
    className.push(`input--${size}`)
  }

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input__label">{label}</label>
      )}
      <input
        className={className.join(' ')}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}

export default Input
