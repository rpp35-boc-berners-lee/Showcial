import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const pages = ['Sign in', 'Sign up'];
const loggedInPages = ['About', 'Log out'];

const ResponsiveAppBar = () => {
   const auth = useAuth();
   console.log('auth:', auth);

   const navigate = useNavigate();
   const location = useLocation();
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
   );
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
   );

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseNavMenuLoggedIn = (page: string) => {
      setAnchorElNav(null);
      if (page === 'About') {
         navigate('/about', { replace: true });
      } else {
         auth.signout();
      }
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const handleNavigate = (page: string) => {
      if (page === 'Sign in') {
         navigate('/signin');
      }
      if (page === 'Sign up') {
         navigate('/signup');
      }
   };

   return (
      <AppBar position='static'>
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Typography
                  variant='h6'
                  noWrap
                  component='a'
                  href='/'
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                     flexGrow: 4,
                  }}
               >
                  Showcial
               </Typography>
               {/* MOBILE ONLY */}
               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size='large'
                     aria-label='account of current user'
                     aria-controls='menu-appbar'
                     aria-haspopup='true'
                     onClick={handleOpenNavMenu}
                     color='inherit'
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id='menu-appbar'
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {auth.isLoggedIn === false
                        ? pages.map((page) => (
                             <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign='center'>
                                   {page}
                                </Typography>
                             </MenuItem>
                          ))
                        : loggedInPages.map((page) => (
                             <MenuItem
                                key={page}
                                onClick={() => handleCloseNavMenuLoggedIn(page)}
                             >
                                <Typography textAlign='center'>
                                   {page}
                                </Typography>
                             </MenuItem>
                          ))}
                  </Menu>
               </Box>
               {/* END MOBILE */}
               <Typography
                  variant='h5'
                  noWrap
                  component='a'
                  href='/'
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },

                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  Showcial
               </Typography>
               {auth.isLoggedIn === false ? (
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                        ml: 'auto',
                        float: 'right',
                        alignSelf: 'flex-end',
                     }}
                  >
                     {pages.map((page) => (
                        <Button
                           key={page}
                           variant='text'
                           onClick={() => handleNavigate(page)}
                           sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                           {page}
                        </Button>
                     ))}
                  </Box>
               ) : (
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                        ml: 'auto',
                        float: 'right',
                        alignSelf: 'flex-end',
                     }}
                  >
                     <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        variant='text'
                        onClick={() => navigate('about', { replace: true })}
                     >
                        About
                     </Button>
                     <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        variant='text'
                        onClick={() => auth.signout()}
                     >
                        Log out
                     </Button>
                  </Box>
               )}
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default ResponsiveAppBar;
