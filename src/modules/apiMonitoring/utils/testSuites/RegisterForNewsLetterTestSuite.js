import { expect } from 'chai';
import GraphQlConstructs from '../GraphqlConstructs';

export default {
  name: 'Register For News Letter',
  tests: [
    {
      name: 'Happy Path',
      steps: [
        {
          name: 'Register',
          construct: GraphQlConstructs.ADD_NEWS_LETTER_MUTATION,
          postAssertions: [
            {
              assert: 'fieldsExist',
              params: [
                'add_news_letter.news_letter.email',
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Reject malformed emails',
      steps: [
        {
          name: 'Register with wrong email (No .com at the end)',
          construct: GraphQlConstructs.ADD_NEWS_LETTER_MUTATION,
          isErrorExpected: true,
          variables: {
            email: 'email@noncomplete',
          },
          postAssertions: [
            {
              assert: 'custom',
              func: (response) => {
                expect(response.add_news_letter).to.nested.include({ 'errors[0].field': 'email' });
                expect(response.add_news_letter).to.nested.include({ 'errors[0].messages[0]': 'Invalid Email Format.' });
              },
            },
          ],
        },
      ],
    },
  ],
};
