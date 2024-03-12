import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

export default function NoResultModal(props) {
    const navigate = useNavigate()
  const handleClose = () => props.setOpen(false);
  function dashboard(){
    props.setSearchWord(" ")
    props.setOpen(false)
    
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          No Result found
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            <button onClick={dashboard} className='text-[white] font-mono bg-[#B03A2E] p-3 pl-5 pr-5 rounded-sm flex items-center justify-center hover:bg-[#cb4335] text-[15px] ml-[85px]'>Search Again</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}