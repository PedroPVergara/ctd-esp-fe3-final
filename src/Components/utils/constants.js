export const initialState = {
    theme: "light",
    data: [],
    favs: JSON.parse(localStorage.getItem("favs")) || []
  };