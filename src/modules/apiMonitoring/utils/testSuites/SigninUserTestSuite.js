import GraphQlConstructs from '../GraphqlConstructs';

export default {
  name: 'Signin User',
  tests: [
    {
      name: 'Happy Path',
      steps: [
        {
          name: 'Login',
          construct: GraphQlConstructs.SIGNIN_USER_MUTATION,
          constructName: 'signinUserMutation',
          postAssertions: [
            {
              assert: 'fieldsExist',
              params: [
                'signin_user.token',
                'signin_user.client_id',
                'signin_user.expiry',
                'signin_user.user.id',
                'signin_user.user.first_name',
                'signin_user.user.last_name',
                'signin_user.user.email',
              ],
            },
          ],
        },
      ],
    },
    {
      name: "RememberMe : Token Validity should be 1 hours if 'remember_me' is false",
      steps: [
        {
          name: 'Login',
          construct: GraphQlConstructs.SIGNIN_USER_MUTATION,
          variables: {
            remember_me: false,
          },
          postAssertions: [
            {
              assert: 'timestampRange',
              timestampField: 'signin_user.expiry',
              check: 'hours',
              range: {
                equal: 1,
              },
            },
          ],
        },
      ],
    },
    {
      name: "RememberMe : Token Validity should be 335 hours if 'remember_me' is true",
      steps: [
        {
          name: 'Login',
          construct: GraphQlConstructs.SIGNIN_USER_MUTATION,
          variables: {
            remember_me: true,
          },
          postAssertions: [
            {
              assert: 'timestampRange',
              timestampField: 'signin_user.expiry',
              check: 'hours',
              range: {
                from: 335,
                to: 365,
              },
            },
          ],
        },
      ],
    },
  ],
};
