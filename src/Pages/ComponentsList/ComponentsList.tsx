import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ComponentsList.css'
import LeftBar from '../../Shared/Sections/LeftBar/LeftBar'
import Button from '../../Shared/Components/Button/Button'
import Input from '../../Shared/Components/Input/Input'

const ComponentsList = () => {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || ''
  const [selectedComponent, setSelectedComponent] = useState<string>('button')
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({})

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleBlock = (blockId: string) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [blockId]: !prev[blockId]
    }))
  }

  const getComponentCode = (component: string) => {
    switch (component) {
      case 'button':
        return {
          tsx: `import type { ReactNode } from 'react'
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
    className.push(\`button--\${size}\`)
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

export default Button`,
          css: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(234, 226, 183, 0.1);
  color: #EAE2B7;
  border: none;
  border-radius: 980px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.button:hover {
  background: rgba(234, 226, 183, 0.15);
}

.button:active {
  background: rgba(234, 226, 183, 0.2);
  transform: scale(0.98);
}

.button:focus {
  outline: none;
}

.button--small {
  padding: 8px 16px;
  font-size: 14px;
}

.button--large {
  padding: 16px 32px;
  font-size: 18px;
}`
        };
      case 'input':
        return {
          tsx: `import './Input.css'    

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
    className.push(\`input--\${size}\`)
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

export default Input`,
          css: `.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input__label {
  color: #EAE2B7;
  font-size: 14px;
  padding-left: 12px;
}

.input {
  background: rgba(234, 226, 183, 0.1);
  border: none;
  border-radius: 980px;
  padding: 12px 24px;
  font-size: 16px;
  color: #EAE2B7;
  transition: background 0.2s ease;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.input::placeholder {
  color: rgba(234, 226, 183, 0.5);
}

.input:hover {
  background: rgba(234, 226, 183, 0.15);
}

.input:focus {
  background: rgba(234, 226, 183, 0.15);
  outline: none;
}

.input--small {
  padding: 8px 16px;
  font-size: 14px;
}

.input--large {
  padding: 16px 32px;
  font-size: 18px;
}`
        };
      case 'card':
        return { tsx: '', css: '' };
      default:
        return { tsx: '', css: '' };
    }
  }

  const getContent = () => {
    switch (selectedComponent) {
      case 'button':
        const code = getComponentCode(selectedComponent)
        const blockIds = {
          tsx: `${selectedComponent}-tsx`,
          css: `${selectedComponent}-css`
        }

        return (
          <div className="component-demo">
            <div className="component-demo__preview">
              <Button size="small">Small Button</Button>
              <Button>Default Button</Button>
              <Button size="large">Large Button</Button>
            </div>
            <div className="component-demo__code">
              <div className="code-block">
                <div className="code-block__header">
                  <h3>TSX</h3>
                  <Button 
                    size="small"
                    onClick={() => copyToClipboard(code.tsx, 'tsx')}
                  >
                    {copiedType === 'tsx' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className={`code-block__content ${expandedBlocks[blockIds.tsx] ? 'expanded' : ''}`}>
                  <pre>
                    <code>{code.tsx}</code>
                  </pre>
                  <div className="code-block__expand-wrapper">
                    <Button 
                      size="small"
                      onClick={() => toggleBlock(blockIds.tsx)}
                    >
                      {expandedBlocks[blockIds.tsx] ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="code-block">
                <div className="code-block__header">
                  <h3>CSS</h3>
                  <Button 
                    size="small"
                    onClick={() => copyToClipboard(code.css, 'css')}
                  >
                    {copiedType === 'css' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className={`code-block__content ${expandedBlocks[blockIds.css] ? 'expanded' : ''}`}>
                  <pre>
                    <code>{code.css}</code>
                  </pre>
                  <div className="code-block__expand-wrapper">
                    <Button 
                      size="small"
                      onClick={() => toggleBlock(blockIds.css)}
                    >
                      {expandedBlocks[blockIds.css] ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'input':
        const inputCode = getComponentCode(selectedComponent)
        const inputBlockIds = {
          tsx: `${selectedComponent}-tsx`,
          css: `${selectedComponent}-css`
        }

        return (
          <div className="component-demo">
            <div className="component-demo__preview">
              <div className="preview-grid">
                <Input size="small" placeholder="Small input" label="Small" />
                <Input placeholder="Default input" label="Default" />
                <Input size="large" placeholder="Large input" label="Large" />
              </div>
            </div>
            <div className="component-demo__code">
              <div className="code-block">
                <div className="code-block__header">
                  <h3>TSX</h3>
                  <Button 
                    size="small"
                    onClick={() => copyToClipboard(inputCode.tsx, 'tsx')}
                  >
                    {copiedType === 'tsx' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className={`code-block__content ${expandedBlocks[inputBlockIds.tsx] ? 'expanded' : ''}`}>
                  <pre>
                    <code>{inputCode.tsx}</code>
                  </pre>
                  <div className="code-block__expand-wrapper">
                    <Button 
                      size="small"
                      onClick={() => toggleBlock(inputBlockIds.tsx)}
                    >
                      {expandedBlocks[inputBlockIds.tsx] ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="code-block">
                <div className="code-block__header">
                  <h3>CSS</h3>
                  <Button 
                    size="small"
                    onClick={() => copyToClipboard(inputCode.css, 'css')}
                  >
                    {copiedType === 'css' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className={`code-block__content ${expandedBlocks[inputBlockIds.css] ? 'expanded' : ''}`}>
                  <pre>
                    <code>{inputCode.css}</code>
                  </pre>
                  <div className="code-block__expand-wrapper">
                    <Button 
                      size="small"
                      onClick={() => toggleBlock(inputBlockIds.css)}
                    >
                      {expandedBlocks[inputBlockIds.css] ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'card':
        return (
          <div>
            <h2>Card Component</h2>
            <div className="card">
              <h3>Card Title</h3>
              <p>Card content</p>
            </div>
          </div>
        )
      default:
        return (
          <div>
            <h2>Select a component</h2>
            <p>Choose a component from the left menu to see its preview</p>
          </div>
        )
    }
  }

  return (
    <div className="components-list">
      <LeftBar onSelectComponent={setSelectedComponent} />
      <main className="components-list__content">
        <div className="components-list__header">
          <h1 className="components-list__title">Components</h1>
          <p className="components-list__description">
            Explore our collection of beautiful and reusable components
          </p>
        </div>
        <div className="components-list__main">
          {getContent()}
        </div>
      </main>
    </div>
  )
}

export default ComponentsList
