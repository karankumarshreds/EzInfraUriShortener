import React from 'react';
import Toggler from './Toggler';
import { ColorModeContext } from 'context/theme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const pages = ['Analytics', 'Details'];

const Navbar = () => {
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.default',
        boxShadow: `0px 2px 18px 0px rgba(14,155,255,0.15);`,
      }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            fontWeight={600}
            sx={{ mr: 2, display: { md: 'flex' }, color: 'text.primary', py: 3 }}>
            Dyte.io
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'text.secondary', textTransform: 'none' }}>
                <Typography fontWeight={500} variant="subtitle1">
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
          <Toggler onClick={colorMode.toggleColorMode} sx={{ ml: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
