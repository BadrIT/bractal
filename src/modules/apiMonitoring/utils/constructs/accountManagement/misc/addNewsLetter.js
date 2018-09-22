/* eslint-disable */

import faker from 'faker';

const addNewsLetterMutation = `
mutation addNewsLetterMutation (  
    $email: String!  
) {
    add_news_letter(
        email: $email
    ) {
        news_letter {
            email
        }
        errors {
            field
            messages
        }
    }
}
`;

export default {
    ADD_NEWS_LETTER_MUTATION: {
        operation: addNewsLetterMutation,
        displayName: 'Mutation : Add News Letter',
        defaultVariables: {
            email: faker.internet.email(),
        },
    },
};
