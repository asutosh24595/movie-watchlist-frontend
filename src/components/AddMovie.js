import "./AddMovie.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../store/store";
import { addMovieToDb, updateMovie } from "../api/api";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    isWatched: false,
    rating: "",
    review: "",
  });

  const { id } = useParams();
  const movies = useSelector((state) => state.movie.movies);

  const [isEditing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEditing(true);
      const movie = movies.find((movie) => movie._id === id);
      if (movie) {
        setMovieData(movie);
      }
    }
  }, [id, movies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const updatedMovie = await updateMovie(movieData);
        dispatch(movieActions.editMovie(updatedMovie));
      } catch (error) {
        console.error("Error editing movie:", error);
      }
    } else {
      try {
        const newMovie = await addMovieToDb(movieData);
        dispatch(movieActions.addMovie(newMovie));
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    }
    navigate("/");
  };

  return (
    <div className="add-movie">
      <h1>{isEditing ? "Edit movie" : "Add movie"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            id="title"
            name="title"
            type="text"
            value={movieData.title}
            onChange={(e) =>
              setMovieData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description </label>
          <input
            id="description"
            name="description"
            type="text"
            value={movieData.description}
            onChange={(e) =>
              setMovieData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="release-year">Release Year </label>
          <input
            id="release-year"
            name="release-year"
            type="number"
            value={movieData.releaseYear}
            onChange={(e) =>
              setMovieData((prevData) => ({
                ...prevData,
                releaseYear: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="genre">Genre </label>
          <input
            id="genre"
            name="genre"
            type="text"
            value={movieData.genre}
            onChange={(e) =>
              setMovieData((prevData) => ({
                ...prevData,
                genre: e.target.value,
              }))
            }
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Save
          </button>
          <Link to="/">
            <button type="button" className="button">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
