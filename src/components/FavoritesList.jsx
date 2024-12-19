import React from "react";

function FavoritesList({ favorites, removeFromFavorites }) {
  return (
    <div className="commonFavoriteList">
      <h3 style={{fontSize:"30px", color:"#ffb200"}}>Favorite Movies</h3>
      {favorites.length > 0 ? (
        <ol className="olList">
          {favorites.map((movie) => (
            <li key={movie.id} className="favoriteList">
              <h4>{movie.title} ({movie.year})</h4>
              <button onClick={() => removeFromFavorites(movie.id)} className="removeButton">
               x
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p style={{color:"red"}}>There is not favorite movie !</p>
      )}
    </div>
  );
}

export default FavoritesList;
