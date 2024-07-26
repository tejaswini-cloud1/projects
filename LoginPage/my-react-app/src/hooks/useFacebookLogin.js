import { useEffect } from 'react';

const useFacebookLogin = (appId) => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [appId]);

  const loginWithFacebook = (callback) => {
    window.FB.login(response => {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'name,email' }, callback);
      } else {
        console.log('User cancelled login or failed.');
      }
    }, { scope: 'email' });
  };

  return { loginWithFacebook };
};

export default useFacebookLogin;

