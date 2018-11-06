const generateSequenceFromTo = (from, to) => (from < to
  ? [...Array(to - from).keys()].map(i => i + from)
  : [...Array(from - to).keys()].map(i => from - i)
);

export default generateSequenceFromTo;
