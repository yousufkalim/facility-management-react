export function calculateRating(_) {
  // const sum = _.reduce((a, b) => a + b, 0);
  // const divide = _.length == 0 ? 1 : _.length;
  // const avg = parseFloat((sum / divide).toFixed(2));
  // return `${avg}`;

  const rating = _.reduce((a, b) => a + b, 0) / _.length;
  return rating || 0;
}

export function calculateRatingsCount(_) {
  return `${_.length}`;
}
