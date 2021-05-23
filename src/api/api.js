const MAX_NUM = 9;
const key = `17308409`;

const fetchMovie = async (searchTerm, searchById) => {
  const res = searchById
    ? await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${searchTerm}`)
    : await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`);

  const data = await res.json();

  return searchById ? data : data.Search;
};

const fetchInitialVal = async () => {
  const initialMovies = [];

  const titles = [
    'Birds of prey',
    'Joker',
    'Titanic',
    'Totoro',
    'Venom',
    'Pokemon',
    '8 mile',
    'Get Out',
    'Space Jam',
  ];

  if (!initialMovies.length > 0) {
    for (let i = 0; i < MAX_NUM; i++) {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${titles[0]}`
        );
        const data = await res.json();

        initialMovies.push(data.Search[0]);
        titles.shift();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return initialMovies;
};

export { fetchMovie, fetchInitialVal };
