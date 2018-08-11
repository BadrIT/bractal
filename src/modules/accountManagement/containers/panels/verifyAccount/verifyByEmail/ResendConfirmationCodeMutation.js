import { graphql } from 'react-relay';

export const ResendConfirmationCodeMutationRoot = 'send_confirmation_code';

export default graphql`
  mutation ResendConfirmationCodeMutation (
    $email: String!,
  ) {
    send_confirmation_code (
      email: $email,
    ) {      
      errors {
        field
        messages
      }
      sent
    }
  }
`;

