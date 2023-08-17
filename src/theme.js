import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Mode sombre
    primary: {
      main: '#90caf9', // Couleur principale
    },
    secondary: {
      main: '#f48fb1', // Couleur secondaire
    },
    // Autres options de palette (text, background, etc.)
  },
  // Autres options de thème (typographie, espacement, etc.)
});

export default theme;