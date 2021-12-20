import * as React from 'react';
import { ColorModeContext } from 'context/theme';
// material ui components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  border: 'none',
  outline: 'none',
  borderRadius: 2,
};

interface Props {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSuccess: () => void;
  successButtonText?: string;
}

const GenericModal: React.FC<Props> = ({ show, onClose, title, description, successButtonText, onSuccess }) => {
  const { mode } = React.useContext(ColorModeContext);
  return (
    <Modal open={show} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          ...style,
          backgroundColor: `${mode === 'light' ? '#fff' : '#14192e'}`,
          boxShadow: `0px 2px 18px 0px ${mode === 'light' ? '#efefef' : 'rgba(14,155,255,0.15)'} `,
        }}>
        <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: 'text.secondary' }}>
          {description}
        </Typography>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={() => {
              onSuccess();
              onClose();
            }}>
            {successButtonText || 'Yes'}
          </Button>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default GenericModal;
