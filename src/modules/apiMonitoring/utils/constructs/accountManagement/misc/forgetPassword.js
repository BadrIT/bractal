/* eslint-disable */

import faker from 'faker';

const forgetPasswordMutation = `
    mutation forgetPasswordMutation (  
        $email: String!  
    ) {
        forgot_password_send_code(
            email: $email
        ) {
            errors {
                field
                messages
            }
        }
    }
`;

export default {
    FORGOT_PASSWORD_MUTATION: {
        operation: forgetPasswordMutation,
        displayName: 'Mutation : Forgot password mutation',
        defaultVariables: {
            email: faker.internet.email(),
        },
    },
};
