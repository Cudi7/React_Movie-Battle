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

const compareBoxOffice = (data) =>
  Number(data.primary[6].value.slice(1, -1).replaceAll(',', '')) >
  Number(data.secondary[6].value.slice(1, -1).replaceAll(',', ''));

export {
  compareAwards,
  compareMetascore,
  compareRating,
  compareVotes,
  compareBoxOffice,
};
