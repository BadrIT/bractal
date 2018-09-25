const generateSequenceFromTo = (from, to) => (
  [...Array(to - from).keys()].map(i => i + from)
);

export default generateSequenceFromTo;
