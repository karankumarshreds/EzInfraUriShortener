import * as React from 'react';
import useRequest from 'hooks/useRequest';
import { ColorModeContext } from 'context/theme';
// material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // boxShadow: 24,
  p: 4,
  border: 'none',
  outline: 'none',
  borderRadius: 2,
};

interface Props {
  show: boolean;
  onClose: () => void;
  urlId: string;
  onSuccess: (updatedURL: string) => void;
}

const EditModal: React.FC<Props> = ({ show, onClose, urlId, onSuccess }) => {
  const [shortUrl, setShortUrl] = React.useState<string>('');
  const { mode } = React.useContext(ColorModeContext);

  const { pending, makeRequest, errorsMap } = useRequest({
    url: `/api/url/${urlId}`,
    method: 'put',
    onSuccess: () => {
      onSuccess(shortUrl);
      onClose();
    },
    onError: () => {},
    payload: { shortUrl },
  });

  return (
    <Modal open={show} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          ...style,
          backgroundColor: `${mode === 'light' ? '#fff' : '#14192e'}`,
          boxShadow: `0px 2px 18px 0px ${mode === 'light' ? '#efefef' : 'rgba(14,155,255,0.15)'} `,
        }}>
        <Typography id="modal-modal-title" variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>
          Edit Short URL
        </Typography>
        <br />
        <TextField
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          label="Short URL"
          error={errorsMap['shortUrl'] ? true : false}
          sx={{ width: '100%', color: 'text.primary' }}
          helperText={errorsMap['shortUrl']}
        />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {pending ? (
            <CircularProgress />
          ) : (
            <React.Fragment>
              <Button
                variant="contained"
                onClick={() => {
                  if (!urlId) return;
                  makeRequest();
                }}
                disabled={!shortUrl || shortUrl.length < 6}>
                Save
              </Button>
              <Button variant="outlined" sx={{ ml: 1 }} onClick={onClose}>
                Cancel
              </Button>
            </React.Fragment>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
