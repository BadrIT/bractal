const getFirstNChilren = (array, n) => {
  const min = Math.min(n, array.length);
  return [...Array(min).keys()].map(i => array[i]);
};

export default getFirstNChilren;
