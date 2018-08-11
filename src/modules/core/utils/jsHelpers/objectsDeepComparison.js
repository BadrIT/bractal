export default function objectsDeepNotEqualComparison(obj1, obj2) {
  const twoObjectsAreNotEqual = JSON.stringify(obj1) !== JSON.stringify(obj2);
  return twoObjectsAreNotEqual;
}
