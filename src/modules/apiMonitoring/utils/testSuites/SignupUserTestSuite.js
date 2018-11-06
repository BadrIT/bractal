import { expect } from 'chai';
import faker from 'faker';

import GraphQlConstructs from '../GraphqlConstructs';

export default {
  name: 'Signup User',
  tests: [
    {
      name: 'Happy Path',
      steps: [
        {
          name: 'Create User',
          construct: GraphQlConstructs.CREATE_USER_MUTATION,
          variables: {
            email: faker.internet.email(),
            mobile_number: `${faker.phone.phoneNumber('(+0##) #######')}`,
          },
          postAssertions: [
            {
              assert: 'fieldsExist',
              params: [
                'create_user.token',
                'create_user.client_id',
                'create_user.expiry',
                'create_user.user.id',
                'create_user.user.first_name',
                'create_user.user.last_name',
                'create_user.user.email',
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Reject wrong formatted inputs',
      steps: [
        {
          name: 'Reject wrong email format',
          construct: GraphQlConstructs.CREATE_USER_MUTATION,
          variables: {
            email: 'some joke !!',
          },
          postAssertions: [
            {
              assert: 'custom',
              func: (response) => {
                expect(response.create_user).to.nested.include({ 'errors[0].field': 'email' });
                expect(response.create_user).to.nested.include({ 'errors[0].messages[0]': 'Invalid Email Format.' });
              },
            },
          ],
        },
      ],
    },
  ],
};
