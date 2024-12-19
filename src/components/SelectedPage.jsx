import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SelectedPage = ({ removeFromFavorites }) => {
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <div className="commonSelected">
      <h1 className="selectedName">Favorite Movies</h1>
      <ol>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Link to={`https://m.imdb.com/title/${movie.id}`} className="linkName">
              <li key={movie.id} className="listNumber">
                <h2>
                  {movie.title} ({movie.year})
                </h2>
                {/* <button onClick={() => removeFromFavorites(movie.id)} className="remove">
                  x
                </button> */}
              </li>
            </Link>
          ))
        ) : (
          <p style={{color:"red"}}>No favorite movies !</p>
        )}
      </ol>
    </div>
  );
};

export default SelectedPage;
