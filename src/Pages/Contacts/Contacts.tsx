import './Contacts.css'
import Header from '../../Shared/Sections/Header/Header'

const Contacts = () => {
  return (
    <div className="contacts-page">
        <Header />
      <div className="contacts-card">
        <div className="profile-section">
          <div className="profile-image">Y</div>
          <h1>Yonas</h1>
          <p className="title">Frontend Developer</p>
        </div>

        <div className="contact-links">
          <div className="contact-item">
            <span className="contact-label">email</span>
            <a href="mailto:gudip@bk.ru" className="contact-link">
              gudip@bk.ru
            </a>
          </div>
          
          <div className="contact-item">
            <span className="contact-label">telegram</span>
            <a href="https://t.me/yokio42" className="contact-link">
              @yokio42
            </a>
          </div>
          
          <div className="contact-item">
            <span className="contact-label">github</span>
            <a href="https://github.com/Yonas3s" className="contact-link">
              github.com/Yonas3s
            </a>
          </div>
        </div>

        <div className="location-time">
          <div className="info-item">
            <span className="label">Location</span>
            <span className="value">Moscow</span>
          </div>
          <div className="info-item">
            <span className="label">Working Hours</span>
            <span className="value">10:00 - 19:00 MSK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts 
