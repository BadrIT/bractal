/* eslint-disable */

import faker from 'faker';

const signinUserMutation = `
mutation SigninMutation (  
    $user_signin: String!  
    $password: String!
    $remember_me: Boolean!
) {
    signin_user(
        user_signin: $user_signin
        password: $password
        remember_me: $remember_me
    ) {
        token
        client_id
        expiry
        user {
            id
            first_name
            last_name
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
    SIGNIN_USER_MUTATION: {
        operation: signinUserMutation,
        name: 'signinUserMutation',
        displayName: 'Mutation : Signin User',
        defaultVariables: {
            user_signin: '123456',
            password: `123456`,
            remember_me: false,            
        },
    },
};
