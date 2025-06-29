import { useState } from 'react'
import './LeftBar.css'

const components = [
  {
    title: 'Basic',
    items: [
      { 
        name: 'Button', 
        key: 'button', 
        description: 'Glass-effect buttons with press animation' 
      },
      { 
        name: 'Input', 
        key: 'input', 
        description: 'Text fields with floating labels and validation' 
      },
      { 
        name: 'Card', 
        key: 'card', 
        description: 'Cards with blur background and gradients' 
      }
    ]
  },
  {
    title: 'Navigation',
    items: [
      { 
        name: 'Header', 
        key: 'header', 
        description: 'Responsive navigation bar with animations' 
      },
      { 
        name: 'Tabs', 
        key: 'tabs', 
        description: 'iOS-style tabs with smooth transitions' 
      },
      { 
        name: 'Menu', 
        key: 'menu', 
        description: 'Dropdown menu with custom animations' 
      }
    ]
  },
  {
    title: 'Elements',
    items: [
      { 
        name: 'Toast', 
        key: 'toast', 
        description: 'Pop-up notifications with auto-dismiss' 
      },
      { 
        name: 'Modal', 
        key: 'modal', 
        description: 'Modal windows with background blur effect' 
      },
      { 
        name: 'Badge', 
        key: 'badge', 
        description: 'Info badges and status indicators' 
      }
    ]
  }
]

interface LeftBarProps {
  onSelectComponent: (key: string) => void;
}

const LeftBar = ({ onSelectComponent }: LeftBarProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  const handleComponentClick = (key: string) => {
    setSelectedComponent(key);
    onSelectComponent(key);
  };

  return (
    <aside className="left-bar">
      <div className="left-bar__header">
        <h2 className="left-bar__title">Components</h2>
        <p className="left-bar__description">UI Component Library</p>
      </div>

      <nav className="left-bar__nav">
        {components.map((section) => (
          <div key={section.title} className="left-bar__section">
            <h3 className="left-bar__section-title">{section.title}</h3>
            <ul className="left-bar__list">
              {section.items.map((item) => (
                <li key={item.name} className="left-bar__item">
                  <div 
                    className={`left-bar__link ${selectedComponent === item.key ? 'active' : ''}`}
                    onClick={() => handleComponentClick(item.key)}
                  >
                    <span className="left-bar__component-name">{item.name}</span>
                    <span className="left-bar__component-description">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default LeftBar
