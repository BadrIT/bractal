
export default function userAuthurization() {
  let TokenisValid = false;
  const Token = localStorage.getItem('AuthToken');
  if (
    Token !== '' &&
    Token !== undefined &&
    Token !== 'null' &&
    Token !== null
  ) {
    TokenisValid = true;
  } else {
    TokenisValid = false;
  }
  return TokenisValid;
}
