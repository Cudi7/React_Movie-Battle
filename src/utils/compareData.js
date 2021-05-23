function compareAwards(data) {
  // hasWinnerAction
  const primary = compareAwardsNumber(data.primary);
  const secondary = compareAwardsNumber(data.secondary);

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

const compareMetascore = (data) =>
  data.primary[3].value > data.secondary[3].value;

const compareRating = (data) =>
  Number(data.primary[4].value) > Number(data.secondary[4].value);

const compareVotes = (data) =>
  Number(data.primary[5].value.replaceAll(',', '')) >
  Number(data.secondary[5].value.replaceAll(',', ''));

const compareBoxOffice = (data) => {
  const boxOfficeOne = data.primary[7]
    ? Number(data.primary[7].value.slice(1, -1).replaceAll(',', ''))
    : 0;
  const boxOfficeTwo = data.secondary[7]
    ? Number(data.secondary[7].value.slice(1, -1).replaceAll(',', ''))
    : 0;

  console.log(boxOfficeOne);
  console.log(boxOfficeTwo);
  console.log(boxOfficeOne > boxOfficeTwo);

  if (boxOfficeOne === 0 && boxOfficeTwo === 0) return undefined;

  return boxOfficeOne > boxOfficeTwo;
};

export {
  compareAwards,
  compareMetascore,
  compareRating,
  compareVotes,
  compareBoxOffice,
};
