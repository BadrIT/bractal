import { fetchQuery, graphql } from 'relay-runtime';

const query = graphql`
  query loadUserSettingsQuery {
    system_configuration_settings {
      currecnt_location_country_code
    }
  }
`;

export default (environment, callback) => {
  fetchQuery(environment, query)
    .then((data) => {
      callback(data.system_configuration_settings);
    });
};
