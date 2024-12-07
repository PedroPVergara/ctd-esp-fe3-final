import { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'

const Footer = () => {
  const { theme } = useContext(ContextGlobal);

  return (
    <footer className={theme}>
      <div className="footer-container">
        <div className="footer-red-line" />
        <div className="footer-content">
          <div className="footer-left">
            <span>Powered by</span>
            <img src="/images/DH.png" alt="DH-logo" />
          </div>
          
          <div className="footer-right">
            {[
              { name: 'facebook', url: 'https://www.facebook.com' },
              { name: 'instagram', url: 'https://www.instagram.com' },
              { name: 'tiktok', url: 'https://www.tiktok.com' },
              { name: 'whatsapp', url: 'https://www.whatsapp.com' }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={`/images/ico-${social.name}.png`}
                  alt={social.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer