const MAX_NUM = 9;
const key = `17308409`;

const fetchMovie = async (searchTerm, searchById) => {
  const res = searchById
    ? await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${searchTerm}`)
    : await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`);

  const data = await res.json();

  return searchById ? data : data.Search;
};

const fetchInitialVal = async () => {
  const initialMovies = window.localStorage.getItem('movies')
    ? JSON.parse(window.localStorage.getItem('movies'))
    : [];

  const titles = [
    'Birds of prey',
    'Venom',
    'Titanic',
    '8 mile',
    'Joker',
    'Pokemon',
    'Totoro',
    'Get Out',
    'Space Jam',
  ];

  if (!initialMovies.length > 0) {
    for (let i = 0; i < MAX_NUM; i++) {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${titles[0]}`
        );
        const data = await res.json();

        initialMovies.push(data.Search[0]);
        titles.shift();
      } catch (error) {
        console.log(error.message);
      }
    }
    window.localStorage.setItem('movies', JSON.stringify(initialMovies));
  }

  return initialMovies;
};

export { fetchMovie, fetchInitialVal };
