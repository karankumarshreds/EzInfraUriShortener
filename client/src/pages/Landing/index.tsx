import React from 'react';
// @ts-ignore
import Light from '../../light.svg';
// @ts-ignore
import Dark from '../../dark.svg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { ColorModeContext } from 'context/theme';

const LandingPage: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100, userSelect: 'none' }}>
      <div className="wrapper" style={{ textAlign: 'center' }}>
        <Typography className="box" sx={{ color: 'text.primary' }} variant="h3" fontWeight={600}>
          Dyte.io URL Shortener
        </Typography>
      </div>
      <br />
      <br />
      <br />
      <img src={`${colorMode.mode === 'light' ? Light : Dark}`} />
      <br />
      <br />

      <Typography variant="h6" sx={{ color: 'text.primary' }} fontWeight={600}>
        Get Started For Free
      </Typography>

      <br />
      <div>
        <Button variant="contained" sx={{ px: 4, py: 1.5, borderRadius: 1.5, mr: 3, textTransform: 'none' }}>
          Signup for free
        </Button>
        <Button variant="outlined" sx={{ px: 4, py: 1.5, borderRadius: 1.5, textTransform: 'none' }}>
          Signin
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
