export default function assert(condition, message) {
  if (!condition) {
    const errorMessage = message || 'Assertion failed';

    if (typeof Error !== 'undefined') {
      throw new Error(errorMessage);
    }
    throw errorMessage; // Fallback
  }
}
