import { Link } from "react-router-dom";
import "./Home.css";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useEffect } from "react";
import { fetchMoviesFromDb } from "../api/api";
import { movieActions } from "../store/store";

const Home = () => {
  const movies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesFromDb = await fetchMoviesFromDb();
        dispatch(movieActions.setMovies(moviesFromDb));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div className="app">
      <div className="header-container">
        <h1 className="header">Movies Watchlist</h1>
        <Link to="/add-movie">
          <button className="button">
            <div className="button-add">
              <LibraryAddIcon />
              <span>Add movie</span>
            </div>
          </button>
        </Link>
      </div>
      {movies.length > 0 ? (
        <div className="movies">
          <div className="list">
            {movies.map((movie) => (
              <MovieCard key={movie._id} id={movie._id} title={movie.title} />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-movies">
          <p>No movies in watchlist</p>
        </div>
      )}
    </div>
  );
};

export default Home;
