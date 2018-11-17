import generateSequenceFromTo from '~/modules/core/utils/jsHelpers/generateSequence';

const getPaginationArray = (currentPage, lastPage, shownLinksCount) => {
  const arr = [1];

  if (currentPage < (shownLinksCount - 1) || lastPage === (shownLinksCount - 1)) {
    if (lastPage > (shownLinksCount - 1)) {
      generateSequenceFromTo(2, (shownLinksCount - 1)).map(i => arr.push(i));
      arr.push('.');
    } else {
      generateSequenceFromTo(2, lastPage).map(i => arr.push(i));
    }
  } else if (currentPage > lastPage - ((shownLinksCount / 2) + 1)) {
    arr.push('.');
    generateSequenceFromTo(lastPage - (shownLinksCount / 2), lastPage).map(i => arr.push(i));
  } else {
    arr.push('.');
    generateSequenceFromTo(
      currentPage - 2,
      currentPage + ((shownLinksCount / 2) - 1),
    ).map(i => arr.push(i));
    arr.push('.');
  }

  arr.push(lastPage);
  return (arr);
};

export default getPaginationArray;
