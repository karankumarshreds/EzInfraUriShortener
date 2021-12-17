import React from 'react';
import { Routes, Route } from 'react-router-dom';
// @ts-ignore
import bg_dark from './bg-dark.svg';
// @ts-ignore
import bg_light from './bg-light.svg';
import { ColorModeContext } from 'context/theme';
import { getDesignTokens } from 'style/theme';
import { AuthContext } from 'context/auth';
import { UserPayload } from 'interfaces';
import useRequest from 'hooks/useRequest';
// material ui
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
// components
import Navbar from 'components/Navbar';
import Signin from 'pages/Auth/Signin';
import Signup from 'pages/Auth/Signup';
import LandingPage from 'pages/Landing';
import Loading from 'pages/Loading';
import axios from 'axios';

const App: React.FC = () => {
  // main
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );
  // @ts-ignore
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const { setAuthState } = React.useContext(AuthContext);
  const { pending, makeRequest } = useRequest({
    url: '/api/auth/current-user',
    method: 'get',
    payload: {},
    onSuccess: (payload: UserPayload) => {
      setAuthState(payload);
    },
    onError: () => {
      setAuthState(null);
    },
  });

  React.useEffect(() => {
    makeRequest();
  }, []);

  if (pending) return <Loading />;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            bgcolor: 'background.default',
            backgroundImage: `url(${mode === 'light' ? bg_light : bg_dark})`,
          }}>
          <Navbar />
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
