import React from "react";

function MovieList({ movies, addToFavorites }) {
  return (
    <div>
      <h3 className="h3">Movies</h3>
      {movies.length > 0 ? (
        <div>
          {movies.map((movie) => (
            <div key={movie.id} >
              <div className="movieList">
              <h4 className="movieName">{movie.title} ({movie.year})</h4>
              <img src={movie.poster} alt={movie.title} className="posterImg" />
              <button onClick={() => addToFavorites(movie)} className="favoriteButton">
                Add to favorite
              </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{color:"red"}}>The movie isn't found !</p>
      )}
    </div>
  );
}

export default MovieList;
