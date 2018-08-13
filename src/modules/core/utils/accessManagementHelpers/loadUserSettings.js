import { fetchQuery, graphql } from 'relay-runtime';

const query = graphql`
  query loadUserSettingsQuery {
    system_configuration_settings {
      current_location_country_code
    }
  }
`;

export default (environment, callback) => {
  fetchQuery(environment, query)
    .then((data) => {
      if (data) {
        callback(data.system_configuration_settings);
      } else {
        throw new Error("Couldn't load user's configuration settings");
      }
    });
};
