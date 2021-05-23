import IndexMovieApp from './pages/IndexMovieApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MovieProvider } from './contexts/movie.context';

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <MovieProvider>
        <IndexMovieApp />
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
