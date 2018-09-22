import { expect } from 'chai';
import GraphQlConstructs from '../GraphqlConstructs';

export default {
  name: 'Forgot password test',
  tests: [
    {
      name: 'Happy Path',
      steps: [
        {
          name: 'Send Email',
          variables: {
            email: 'mostafa.ali@badrit.com',
          },
          construct: GraphQlConstructs.FORGOT_PASSWORD_MUTATION,
        },
      ],
    },
    {
      name: 'Reject malformed (Or non-existing) emails',
      steps: [
        {
          name: 'Register with wrong email',
          construct: GraphQlConstructs.FORGOT_PASSWORD_MUTATION,
          isErrorExpected: true,
          variables: {
            email: 'wrongEmail',
          },
          postAssertions: [
            {
              assert: 'custom',
              func: (response) => {
                expect(response.forgot_password_send_code).to.nested.include({ 'errors[0].field': 'email' });
                expect(response.forgot_password_send_code).to.nested.include({ 'errors[0].messages[0]': 'The Email or phone number doesn’t exist.' });
              },
            },
          ],
        },
      ],
    },
  ],
};
