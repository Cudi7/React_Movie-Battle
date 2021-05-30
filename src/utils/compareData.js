function compareAwards(data) {
  // hasWinnerAction
  const primary = compareAwardsNumber(data.primary);
  const secondary = compareAwardsNumber(data.secondary);

  if (primary === 0 && secondary === 0) return 'N/A';

  return primary > secondary;
}

const compareAwardsNumber = (data) => {
  let currentNumber = '';
  let numberSum = 0;

  data[1].value.split('').forEach((el) => {
    if (!isNaN(parseInt(el))) {
      currentNumber += Number(el);
    } else {
      if (currentNumber.length) numberSum += Number(currentNumber);
      currentNumber = '';
    }
  });

  return numberSum;
};

const compareMetascore = (data) => {
  const primaryData = data.primary[3].value;
  const secondaryData = data.secondary[3].value;

  if (primaryData === 'N/A' && secondaryData === 'N/A') return 'N/A';

  return (
    (primaryData === 'N/A' ? 0 : primaryData) >
    (secondaryData === 'N/A' ? 0 : secondaryData)
  );
};

const compareRating = (data) => {
  const firstRating =
    Number(data.primary[4].value) === 'N/A'
      ? 'N/A'
      : Number(data.primary[4].value);

  const secondRating =
    Number(data.secondary[4].value) === 'N/A'
      ? 'N/A'
      : Number(data.secondary[4].value);

  if (firstRating === 'N/A' && secondRating === 'N/A') return 'N/A';

  return firstRating > secondRating;
};

const compareVotes = (data) => {
  const firstVote =
    data.primary[5].value === 'N/A'
      ? 'N/A'
      : Number(data.primary[5].value.replaceAll(',', ''));
  const secondVote =
    data.secondary[5].value === 'N/A'
      ? 'N/A'
      : Number(data.secondary[5].value.replaceAll(',', ''));

  if (firstVote === 'N/A' && secondVote === 'N/A') return 'N/A';

  return (
    (firstVote === 'N/A' ? 0 : firstVote) >
    (secondVote === 'N/A' ? 0 : secondVote)
  );
};

const compareBoxOffice = (data) => {
  const boxOfficeOne = data.primary[7]
    ? Number(data.primary[7].value.slice(1, -1).replaceAll(',', ''))
    : 0;
  const boxOfficeTwo = data.secondary[7]
    ? Number(data.secondary[7].value.slice(1, -1).replaceAll(',', ''))
    : 0;

  if (
    (boxOfficeOne === 0 || isNaN(boxOfficeOne)) &&
    (isNaN(boxOfficeTwo) || boxOfficeTwo === 0)
  )
    return undefined;

  return boxOfficeOne > boxOfficeTwo;
};

export {
  compareAwards,
  compareMetascore,
  compareRating,
  compareVotes,
  compareBoxOffice,
};
