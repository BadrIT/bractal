import Auth0Lock from 'auth0-lock';

const clientId = 'D3ggRrfsVopz2nwy7tFOR7kTLSH10Pa3';
const domain = 'bractal.auth0.com';

const options = {
  theme: {
    logo: '/images/Header/logo-icon-transparent.png',
    primaryColor: '#0065b3',
  },
  languageDictionary: {
    title: 'Bractal Auth0 Tutorial',
    signUpTitle: 'Bractal Auth0 Tutorial',
  },
  auth: {
    redirectUrl: 'http://localhost:3000/todos/list',
    responseType: 'token',
    scope: 'openid',
    audience: 'https://bractal.auth0.com/api/v2/',
    issuer: 'https://bractal.auth0.com',
  },
  allowShowPassword: true,
  autoclose: true,
};

const lock = new Auth0Lock(clientId, domain, options);

// Listen for the authenticated event and get profile
lock.on('authenticated', (authResult) => {
  lock.getUserInfo(authResult.accessToken, (error) => {
    if (error) {
      // Handle error
      return;
    }
    console.log(authResult);
    localStorage.setItem('accessToken', authResult.accessToken);
  });
});

export const logout = () => lock.logout({
  returnTo: 'http://localhost:3000/todos/',
});

export const login = (props) => {
  lock.checkSession({
    redirectUrl: 'http://localhost:3000/todos/list',
    scope: 'openid',
    audience: 'https://bractal.auth0.com/api/v2/',
  }, (error, authResult) => {
    if (error || !authResult) {
      lock.show();
    } else {
      props.history.push('/todos/list');
    }
  });
};
