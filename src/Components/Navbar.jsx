// Navbar.jsx
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ContextGlobal);

  return (
    <nav className={theme === 'dark' ? 'dark' : 'light'}>
      <div className="nav-logo">
        <img src="/images/DHLogo.png" alt="DH-logo" />
      </div>
      <div className="nav-right">
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/favs">Favs</Link>
        </div>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar