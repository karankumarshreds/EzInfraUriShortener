import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// @ts-ignore
import bg_dark from './bg-dark.svg';
// @ts-ignore
import bg_light from './bg-light.svg';
import { ColorModeContext } from 'context/theme';
import { getDesignTokens } from 'style/theme';
import { AuthContextProvider } from 'context/auth';
// material ui
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
// components
import Navbar from 'components/Navbar';
import Signin from 'pages/Auth/Signin';
import Signup from 'pages/Auth/Signup';
import LandingPage from 'pages/Landing';
// providers

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              bgcolor: 'background.default',
              backgroundImage: `url(${mode === 'light' ? bg_light : bg_dark})`,
            }}>
            <Navbar />
            <BrowserRouter>
              <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
