import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import FavoritesList from "./components/FavoritesList";
import { Routes, Route, useNavigate } from "react-router-dom";
import SelectedPage from "./components/SelectedPage";
import "./components/Style.css";

const API_KEY = "fb3876e4";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMovies = async (searchQuery) => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          }))
        );
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Unable to load movies:", error);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  useEffect(() => {
    fetchMovies("Joker");
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const openSelectedPage = () => {
    window.open("/selected", "_blank");
  };

  return (
    <>
      <Routes>
        <Route
          path="/Film-Generator"
          element={
            <div style={{ display: "flex", padding: 20 }}>
              <div style={{ width: "60%" }}>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter movie"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={() => fetchMovies(search)}
                  style={{ marginLeft: 10 }}
                  className="searchButton"
                >
                  Search
                </button>
                <MovieList movies={movies} addToFavorites={addToFavorites} />
              </div>

              <div style={{ width: "40%", marginLeft: 20 }}>
                <FavoritesList
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
                <button
                  onClick={openSelectedPage}
                  style={{ marginTop: 10 }}
                  className="lastButton"
                >
                  Go to Favorite Movies
                </button>
              </div>
            </div>
          }
        />

        <Route
          path="/selected"
          element={
            <SelectedPage
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
