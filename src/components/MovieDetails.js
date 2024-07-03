import { useDispatch, useSelector } from "react-redux";
import "./MovieDetail.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { movieActions } from "../store/store";
import Rating from "./Rating";
import Review from "./Review";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteModal from "./DeleteConfirm";
import {
  deleteMovieFromDb,
  updateRatingInDb,
  updateReviewInDb,
  updateWatchedInDb,
} from "../api/api";

const MovieDetails = () => {
  const movies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie._id === id);
  

  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!movie) {
    return <p>Movie not found or deleted.</p>;
  }

  const handleOpenRatingModal = () => {
    setRatingModalOpen(true);
  };

  const handleOpenReviewModal = () => {
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
  };

  const handleCloseRatingModal = () => {
    setRatingModalOpen(false);
  };

  const handleRatingSubmit = async (rating) => {
    try {
      await updateRatingInDb(id, rating);
      dispatch(
        movieActions.rateMovie({
          ...movie,
          rating: rating,
        })
      );
    } catch (error) {
      console.error("Error giving rating");
    }
  };

  const handleReviewSubmit = async (review) => {
    try {
      await updateReviewInDb(id, review);
      dispatch(
        movieActions.reviewMovie({
          ...movie,
          review: review,
        })
      );
    } catch (error) {
      console.error("Error giving review");
    }
  };
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
    navigate("/");
  };

  const handleWatched = async (id) => {
    try {
      await updateWatchedInDb(id);
      dispatch(movieActions.toggleWatched({ id }));
    } catch (error) {
      console.error("Error toggling watched");
    }
  };

  return (
    <>
      {movie && (
        <div className="movie-data">
          <div className="movie">
            <Link to="/">
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </Link>
            <div className="movie-header">
              <h1>{movie.title}</h1>
              <button className="button" onClick={openDeleteModal}>
                <DeleteIcon />
              </button>
            </div>
            <p className="movie-description">{movie.description}</p>
            <h3>Released: {movie.releaseYear}</h3>
            <h3>Genre: {movie.genre}</h3>
            <button
              onClick={() => handleWatched(movie._id)}
              className="watched-button"
            >
              {movie.isWatched ? "Watched" : "Not Watched"}
            </button>
            <p>Rating: {movie.rating ? movie.rating : "Not Rated"}</p>
            <p>Review: {movie.review ? movie.review : "No Review"}</p>
            <div className="movie-review-rating">
              <button className="button" onClick={handleOpenRatingModal}>
                {movie.rating ? "Edit Rating" : "Add Rating"}
              </button>
              <button className="button" onClick={handleOpenReviewModal}>
                {movie.review ? "Edit Review" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Rating
        open={isRatingModalOpen}
        handleClose={handleCloseRatingModal}
        onRatingSubmit={handleRatingSubmit}
        rating={movie.rating}
      />
      <Review
        open={isReviewModalOpen}
        handleClose={handleCloseReviewModal}
        onReviewSubmit={handleReviewSubmit}
        review={movie.review}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MovieDetails;
