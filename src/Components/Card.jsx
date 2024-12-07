import { useContext, useReducer } from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { ContextGlobal } from './utils/global.context'

const cardReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAV":
      return { ...state, isFavorite: !state.isFavorite }
    default:
      return state
  }
}

const Card = ({ data }) => {
  const { name, username, id } = data
  const { theme } = useContext(ContextGlobal)
  
  const initialState = {
    isFavorite: JSON.parse(localStorage.getItem("favs"))?.some(fav => fav.id === id) || false
  }
  
  const [cardState, dispatch] = useReducer(cardReducer, initialState)

  const handleFav = () => {
    const favs = JSON.parse(localStorage.getItem("favs")) || []
    
    if (!cardState.isFavorite) {
      const newFavs = [...favs, { name, username, id }]
      localStorage.setItem("favs", JSON.stringify(newFavs))
    } else {
      const filteredFavs = favs.filter(fav => fav.id !== id)
      localStorage.setItem("favs", JSON.stringify(filteredFavs))
    }
    
    dispatch({ type: "TOGGLE_FAV" })
  }

  return (
    <article className={`card ${theme}`}>
      <Link to={`/dentist/${id}`} className="card-link">
        <img 
          src="/images/doctor.jpg" 
          alt={`Dr. ${name}`} 
          className="card-img"
        />
        <div className="card-body">
          <h3>{name}</h3>
          <p>@{username}</p>
          <p>ID: {id}</p>
        </div>
      </Link>
      <button 
        onClick={handleFav} 
        className={`favButton ${cardState.isFavorite ? 'active' : ''}`}
      >
        {cardState.isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </article>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
}

export default Card