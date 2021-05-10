const formatedDataFight = (data) => {
  const detailsObject = [];

  for (let i in data) {
    if (
      i === 'Title' ||
      i === 'Poster' ||
      i === 'Awards' ||
      i === 'Metascore' ||
      i === 'imdbRating' ||
      i === 'imdbVotes' ||
      i === 'BoxOffice'
    ) {
      detailsObject.push({ key: i, value: data[i] });
    }
  }
  return detailsObject;
};

const formatedDataDetails = (data) => {
  const detailsObject = [];

  for (let i in data) {
    if (
      i === 'Runtime' ||
      i === 'Genre' ||
      i === 'Director' ||
      i === 'Actors' ||
      i === 'Country' ||
      i === 'Awards' ||
      i === 'Metascore' ||
      i === 'imdbRating' ||
      i === 'imdbVotes' ||
      i === 'Type' ||
      i === 'DVD' ||
      i === 'BoxOffice' ||
      i === 'Production'
    ) {
      detailsObject.push({ key: i, value: data[i] });
    }
  }

  return detailsObject;
};

export { formatedDataFight, formatedDataDetails };
