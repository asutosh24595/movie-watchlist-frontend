import { Modal, Box, Typography} from '@mui/material';

const DeleteModal = ({ open, handleClose, handleDelete }) => {


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        sx={{
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
        }}
      >
        <Typography id="delete-modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mt: 2 }}>
           Delete this movie from watchlist?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap:"20px" }}>
          <button onClick={handleClose} className='button'>
            Cancel
          </button>
          <button onClick={handleDelete} className='button'>
            Delete
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
