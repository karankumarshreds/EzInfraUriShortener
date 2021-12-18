import React from 'react';
import { Link } from 'react-router-dom';
// custom
import Toggler from './Toggler';
import { ColorModeContext } from 'context/theme';
import { AuthContext } from 'context/auth';
// material ui components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Analytics'];
const menuId = 'primary-search-account-menu';

const Navbar = () => {
  const colorMode = React.useContext(ColorModeContext);
  const { authState } = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem disabled onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem sx={{ color: 'black' }} onClick={handleMenuClose}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.default',
        boxShadow: `0px 2px 18px 0px rgba(14,155,255,0.15);`,
      }}>
      <Container>
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              fontWeight={600}
              sx={{ mr: 2, display: { md: 'flex' }, color: 'text.primary', py: 3 }}>
              Dyte.io
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Toggler onClick={colorMode.toggleColorMode} sx={{ ml: 1 }} />
          </Box>

          {authState ? (
            <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', mr: 1 }}>
              {pages.map((page) => (
                <Link to="/analytics" style={{ textDecoration: 'none' }} key={page}>
                  <Button sx={{ my: 2, color: 'text.secondary', textTransform: 'none', mx: 0.5 }}>
                    <Typography fontWeight={500} variant="subtitle1">
                      {page}
                    </Typography>
                  </Button>
                </Link>
              ))}
            </Box>
          ) : (
            <Button variant="outlined" sx={{ ml: 1 }}>
              Signin
            </Button>
          )}

          {authState && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }} onClick={handleProfileMenuOpen}>
                <Avatar>{authState.firstName[0].toUpperCase() + authState.lastName[0].toUpperCase()}</Avatar>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
      {renderMenu}
    </AppBar>
  );
};
export default Navbar;
