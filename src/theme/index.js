import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.grey[600]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      extra: colors.grey[50]
    }
  },
  shadows,
  typography
});

export default theme;
