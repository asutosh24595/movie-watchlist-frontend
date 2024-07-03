import axios from "axios";

const API_BASE_URL = "https://movie-watchlist-backend-aoz5.vercel.app";

export const addMovieToDb = async (movieData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-movie`, movieData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (movieData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/edit-movie/${movieData._id}`,
      movieData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing movie:", error);
    throw error;
  }
};

export const fetchMoviesFromDb = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieFromDb = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies-list/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const deleteMovieFromDb = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const updateWatchedInDb = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/movies-list/${id}/toggle-watched`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const updateRatingInDb = async (id, rating) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/movies-list/${id}/add-rating`,
      {rating},
    );
    return response.data;
  } catch (error) {
    console.error("Error rating movie:", error);
    throw error;
  }
};

export const updateReviewInDb = async (id, review) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/movies-list/${id}/add-review`,
        {review},
      );
      return response.data;
    } catch (error) {
      console.error("Error rating movie:", error);
      throw error;
    }
  };
