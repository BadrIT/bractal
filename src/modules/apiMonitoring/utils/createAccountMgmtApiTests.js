import SignupUserTestSuite from './testSuites/SignupUserTestSuite';
import SigninUserTestSuite from './testSuites/SigninUserTestSuite';
import ListProducts from './testSuites/ListProductsTestSuite';
import RegisterForNewsLetterTestSuite from './testSuites/RegisterForNewsLetterTestSuite';
import ForgotPasswordTestSuite from './testSuites/ForgotPasswordTestSuite';

export default () => ({
  testSuites: [
    SignupUserTestSuite,
    SigninUserTestSuite,
    ForgotPasswordTestSuite,
    RegisterForNewsLetterTestSuite,
    ListProducts,
  ],
});
