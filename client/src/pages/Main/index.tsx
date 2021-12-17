import React from 'react';
import { ColorModeContext } from 'context/theme';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Grid from '@mui/material/Grid';

type Field = 'url' | 'shortUrl';

const Main: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);
  const [state, setState] = React.useState<{ url: string; shortUrl: string }>({
    url: '',
    shortUrl: '',
  });

  const changeHandler = (key: Field, value: string) => {
    setState((oldState) => ({ ...oldState, [key]: value }));
  };

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15);',
            height: 400,
            backgroundColor: `${colorMode.mode === 'light' ? '#fff' : '#14192e'}`,
            borderRadius: 2,
            pt: 6.5,
            pb: 3.5,
            px: 8,
            mt: '10%',
            mx: 'auto',
          }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 600 }} variant="h4">
            Dyte.io Url Shortener
          </Typography>
          <TextField
            // key={field}
            label="Enter the URL to shorten"
            sx={{ color: 'button.primary', width: '100%', mt: 5 }}
            focused={colorMode.mode === 'dark'}
            size="medium"
            value={state.url}
            onChange={(e) => changeHandler('url', e.target.value)}
            // error={errorsMap['url'] ? true : false}
            // helperText={errorsMap['url']}
          />
          <br />
          <br />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              // key={field}
              label="Type URL suffix"
              sx={{ color: 'button.primary', width: '60%' }}
              focused={colorMode.mode === 'dark'}
              size="medium"
              value={state.shortUrl}
              onChange={(e) => changeHandler('shortUrl', e.target.value)}
              // error={errorsMap['shortUrl'] ? true : false}
              // helperText={errorsMap['shortUrl']}
            />
            <div style={{ width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button variant="outlined" sx={{ width: '100%', mr: 1, height: 52 }}>
                or generate
              </Button>
            </div>
          </div>

          <br />
          <br />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.secondary', fontWeight: 600, mr: 2 }} variant="h6">
              Your url preview :{' '}
            </Typography>
            <TextField
              variant="standard"
              label=""
              sx={{ color: 'button.primary', flexGrow: 0.98 }}
              focused={colorMode.mode === 'dark'}
              size="medium"
              // value={state.url + state.shortUrl}
              value={`${state.url}${state.url && state.url.slice(-1) !== '/' ? '/' : ''}${state.shortUrl}`}
              // onChange={() => {}}
            />
          </div>

          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ width: '30%', height: 52 }}>
              Save
            </Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Main;
