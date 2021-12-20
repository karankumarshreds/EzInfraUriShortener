import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { ColorModeContext } from 'context/theme';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// @ts-ignore
import Light from '../../light.svg';
// @ts-ignore
import Dark from '../../dark.svg';
// @ts-ignore
import LightSM from '../../light-sm.svg';
// @ts-ignore
import DarkSM from '../../dark-sm.svg';

const LandingPage: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100, userSelect: 'none' }}>
      <div className="wrapper" style={{ textAlign: 'center' }}>
        <Typography className="box" sx={{ color: 'text.primary', letterSpacing: 0.2 }} variant="h3" fontWeight={800}>
          eazy<span style={{ color: '#0066ff' }}>infra</span> url shortener
        </Typography>
      </div>
      <br />
      <br />
      <br />
      <img className="img__lg" src={`${colorMode.mode === 'light' ? Light : Dark}`} />
      <img className="img__sm" src={`${colorMode.mode === 'light' ? LightSM : DarkSM}`} />
      <br />
      <br />
      <div className="bottom__half">
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.primary' }} fontWeight={600}>
          Get Started For Free
        </Typography>

        <br />
        <div>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            <Button
              variant="contained"
              sx={{ px: 4, py: 1.5, borderRadius: 1.5, mr: 3, textTransform: 'none', backgroundColor: '#0066ff' }}>
              Signup for free
            </Button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/signin">
            <Button variant="outlined" sx={{ px: 4, py: 1.5, borderRadius: 1.5, textTransform: 'none' }}>
              Signin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
