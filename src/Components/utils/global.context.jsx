import { createContext, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  data: [],
  favs: JSON.parse(localStorage.getItem("favs")) || []
};

const reducer = (state, action) => {
  let newState;
  let newFavs;
  let filteredFavs;
  
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { 
        ...state, 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      };
    case 'SET_DATA':
      return { 
        ...state, 
        data: action.payload 
      };
    case 'ADD_FAV':
      newFavs = [...state.favs, action.payload];
      localStorage.setItem("favs", JSON.stringify(newFavs));
      newState = {
        ...state,
        favs: newFavs
      };
      return newState;
    case 'REMOVE_FAV':
      filteredFavs = state.favs.filter(fav => fav.id !== action.payload.id);
      localStorage.setItem("favs", JSON.stringify(filteredFavs));
      newState = {
        ...state,
        favs: filteredFavs
      };
      return newState;
    default:
      return state;
  }
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_DATA', payload: data }))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  const value = {
    theme: state.theme,
    data: state.data,
    favs: state.favs,
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    addFav: (dentist) => dispatch({ type: 'ADD_FAV', payload: dentist }),
    removeFav: (dentist) => dispatch({ type: 'REMOVE_FAV', payload: dentist })
  };

  return (
    <ContextGlobal.Provider value={value}>
      {children}
    </ContextGlobal.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContextProvider;