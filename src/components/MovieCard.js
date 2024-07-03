import "./MovieCard.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WatchIcon from "@mui/icons-material/Watch";
import WatchOffIcon from "@mui/icons-material/WatchOff";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../store/store";
import { useState } from "react";
import DeleteModal from "./DeleteConfirm";
import { deleteMovieFromDb, updateWatchedInDb } from "../api/api";

const MovieCard = ({ title, id }) => {
  const movies = useSelector((state) => state.movie.movies);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const movie = movies.find((movie) => movie._id === id);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteMovieFromDb(id);
      dispatch(movieActions.deleteMovie({ id }));
    } catch (error) {
      console.error("Error deleting movie");
    }
    closeDeleteModal();
  };

  const handleToggleWatched = async (id) => {
    try {
      await updateWatchedInDb(id);
      dispatch(movieActions.toggleWatched({id}));
    } catch (error) {}
  };

  return (
    <div className="movie-card">
      <h1 className="movie-title">
        <Link to={`/movie-details/${id}`} className="movie-title">
          {title}
        </Link>
      </h1>

      <div className="buttons">
        <Link to={`/edit-movie/${id}`}>
          <button className="button">
            <EditIcon />
          </button>
        </Link>
        <button className="button" onClick={openDeleteModal}>
          <DeleteIcon />
        </button>
        <button className="button" onClick={() => handleToggleWatched(id)}>
          {movie.isWatched ? <WatchOffIcon /> : <WatchIcon />}
        </button>
      </div>
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MovieCard;
