import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Rating = ({ open, handleClose, onRatingSubmit, rating }) => {
  const [ratingD, setRating] = useState(rating);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onRatingSubmit(ratingD);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="rating-modal-title"
      aria-describedby="rating-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="rating-modal-title" variant="h6" component="h2">
          Rate the Movie
        </Typography>
        <Box id="rating-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton key={value} onClick={() => handleRating(value)}>
              {value <= ratingD ? <StarIcon sx={{ color: '#FFD700' }} /> : <StarBorderIcon sx={{ color: '#FFD700' }} />}
            </IconButton>
          ))}
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap:"10px" }}>
          <button onClick={handleClose} className="button">Cancel</button>
          <button onClick={handleSubmit} className="button">Submit</button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default Rating;
