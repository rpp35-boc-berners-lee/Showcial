import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#ef4b56',
      },
      secondary: {
         main: '#6E63C6',
      },
      background: {
         default: '#000000',
         paper: '#121212',
      },
   },
});

theme = responsiveFontSizes(theme);
export default theme;
