import { createContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from 'prop-types';

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  data: [],
  favs: JSON.parse(localStorage.getItem("favs")) || []
};

const reducer = (state, action) => {
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
      // Verificar si ya existe en favoritos
      if (state.favs.some(fav => fav.id === action.payload.id)) {
        return state;
      }
      newFavs = [...state.favs, action.payload];
      localStorage.setItem("favs", JSON.stringify(newFavs));
      return {
        ...state,
        favs: newFavs
      };
    case 'REMOVE_FAV':
      filteredFavs = state.favs.filter(fav => fav.id !== action.payload.id);
      localStorage.setItem("favs", JSON.stringify(filteredFavs));
      return {
        ...state,
        favs: filteredFavs
      };
    case 'RESET_FAVS':
      localStorage.setItem("favs", JSON.stringify([]));
      return {
        ...state,
        favs: []
      };
    default:
      return state;
  }
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.id - b.id);
        dispatch({ type: 'SET_DATA', payload: sortedData });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  const contextValue = useMemo(() => ({
    theme: state.theme,
    data: state.data,
    favs: state.favs,
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    addFav: (dentist) => dispatch({ type: 'ADD_FAV', payload: dentist }),
    removeFav: (dentist) => dispatch({ type: 'REMOVE_FAV', payload: dentist }),
    resetFavs: () => dispatch({ type: 'RESET_FAVS' })
  }), [state.theme, state.data, state.favs]);

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContextProvider;