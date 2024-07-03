import React, { useState } from "react";
import { Modal, Box, Typography, TextareaAutosize } from "@mui/material";

const Review = ({ open, handleClose, onReviewSubmit, review }) => {
  const [reviewD, setReview] = useState(review);

  const handleSubmit = () => {
    onReviewSubmit(reviewD);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="review-modal-title" variant="h6" component="h2">
          Add a Review
        </Typography>
        <TextareaAutosize
          id="review-modal-description"
          minRows={5}
          placeholder="Write your review here..."
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
          value={reviewD}
          onChange={(e) => setReview(e.target.value)}
        />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <button onClick={handleClose} className="button">
            Cancel
          </button>
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#edede9",
  borderRadius: 10, // Rounded corners
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Softer shadow
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease-out", // Smooth transition
  outline: "none", // Remove default outline
};

export default Review;
