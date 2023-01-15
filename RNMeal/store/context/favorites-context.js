import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
    ids: [],
    addFavortite: (id) => { },
    removeFavorite: (id) => { }
});

function FavoritesContextProvider({ children }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);
    function addFavortite(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }
    function removeFavorite(id) {
        setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
    }

    const value = {
        ids: favoriteMealIds,
        addFavortite: addFavortite,
        removeFavorite: removeFavorite
    }

    return <FavoritesContext.Provider value={value}>
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContextProvider;