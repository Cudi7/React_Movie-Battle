import IndexMovieApp from './pages/IndexMovieApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <IndexMovieApp />
    </ThemeProvider>
  );
}

export default App;
