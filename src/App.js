import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import googleLogo from './assets/google.png';
import facebookLogo from './assets/facebook.jpg';
import gkbLogo from './assets/gkb.jpg';
import Home from './Home';
import ForgotPassword from './forgot';
import Signup from './components/Signup';

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const serverApiUrl = process.env.REACT_APP_SERVER_API_URL;

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }
    // Perform login logic here
    setIsAuthenticated(true);
  };

  const handleGoogleLogin = () => {
    // Perform Google login logic here
    setIsAuthenticated(true);
  };

  const handleFacebookLogin = (response) => {
    if (response.status !== 'unknown') {
      // Facebook login success
      console.log('Facebook login success:', response);
      // Save user profile to server
      saveUserProfileToServer(response).catch(error => {
        console.error('Error saving user profile to server: ', error.message);
      });
      setIsAuthenticated(true);
    } else {
      console.log('Facebook login failed');
    }
  };

  const saveUserProfileToServer = async (userProfile) => {
    try {
      const response = await axios.post(`${serverApiUrl}/saveUserProfile`, userProfile);
      console.log('User profile saved to server:', response.data);
    } catch (error) {
      console.error('Error saving user profile to server:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    validateForm();
  };

  const validateForm = () => {
    const isFormValid = username.trim() !== '' && password.trim() !== '';
    setIsFormValid(isFormValid);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="HtmlBody" style={{ width: 1440, height: 997, position: 'relative' }}>
      <img className="WhatsappImage20240705At43519Pm2" style={{ width: 400, height: 250, left: 70, top: 130, position: 'absolute' }} src={gkbLogo} />
      <div className="WelcomeBackToGkbLabs" style={{ width: 400, left: 113, top: 379, position: 'absolute', color: 'black', fontSize: 50, fontFamily: 'Poppins', fontWeight: '600', lineHeight: -10, wordWrap: 'break-word' }}>Welcome back,<br />to GKB Labs!</div>
      <div className="Frame12" style={{ width: 423, height: 714, paddingTop: 25, paddingBottom: 25, left: 813, top: 126, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
        <div className="Frame18" style={{ alignSelf: 'stretch', height: 664, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 25, display: 'inline-flex' }}>
          <div className="Frame17" style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 7, display: 'flex' }}>
            <div className="SignInTo" style={{ color: 'black', fontFamily: 'Poppins', fontWeight: '500', position: 'absolute', top: -70, wordWrap: 'break-word' }}>Sign in to</div>
            <div className="ContinueWithGoogleOrFacebookOrEnterYourDetails" style={{ color: 'black', fontFamily: 'Poppins', fontWeight: '400', position: 'absolute', top: -20, wordWrap: 'break-word' }}>Continue with Google or Facebook or enter your details</div>
          </div>
          <div className="Frame15" style={{ justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div className="Group26" style={{ width: 425, height: 361, position: 'relative' }}>
              <div className="Group21" style={{ width: 423, height: 92, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 9, display: 'inline-flex' }}>
                <div className="UserName" style={{ width: 390, color: 'black', fontFamily: 'Poppins', fontWeight: '600', position: 'absolute', top: -80, wordWrap: 'break-word' }}>User name</div>
                <div className="Group20" style={{ width: 425, height: 60, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', position: 'absolute', top: -50, display: 'flex' }}>
                  <div className="Rectangle4" style={{ borderRadius: 6, border: '0.60px #282828 solid' }} />
                  <input className="text1" type="text" name="username" placeholder=' Enter your Name' style={{ fontSize: 30, height: 70, width: 425, border: '0.60px #282828 solid' }} onChange={handleInputChange} />
                </div>
              </div>
              <div className="Group23" style={{ width: 423, height: 92, left: 0, top: 130, position: 'absolute' }}>
                <div className="Group22" style={{ width: 423, height: 92, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 9, display: 'inline-flex' }}>
                  <div className="Password" style={{ width: 390, color: 'black', fontFamily: 'Poppins', fontWeight: '600', position: 'absolute', top: -100, wordWrap: 'break-word' }}>Password</div>
                  <div className="Group20" style={{ width: 425, height: 60, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
                    <div className="Rectangle5" style={{ borderRadius: 6, position: 'absolute', border: '0.60px #282828 solid' }} />
                    <input className="text2" type="password" name="password" placeholder=' Enter your Password' style={{ top: -60, position: 'absolute', height: 50, width: 425, fontSize: 30, border: '0.60px #282828 solid' }} onChange={handleInputChange} />
                  </div>
                </div>
                <Link to="/forgotpassword" className="ForgotPassword" style={{ left: 270, top: 10, position: 'absolute', color: '#4D4D4D', fontSize: 20, fontFamily: 'Poppins', fontWeight: '300', wordWrap: 'break-word' }}>Forgot Password?</Link>
              </div>
              <div className="Group25" style={{ width: 425, height: 60, left: 0, top: 301, position: 'absolute' }}>
                <div className="Rectangle6" /><button className='loginbutton' onClick={handleLogin}>Login</button>
                <div className="Login" style={{ left: 190, top: -86, position: 'absolute', color: 'white', fontSize: 18, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word' }}></div>
              </div>
            </div>
          </div>
          <div className="Frame14" style={{ paddingRight: 3, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div className="DonYHaveAnAccountSignUp"><span style={{ color: '#7D7D7D', fontSize: 20, fontFamily: 'Poppins', fontWeight: '300', position: 'absolute', top: 380, left: 20, wordWrap: 'break-word' }}><pre>Don’t have an Account?</pre></span><Link to="/signup" style={{ color: 'black', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', position: 'absolute', top: 380, left: 270, wordWrap: 'break-word' }}> <pre>Sign Up</pre> </Link></div>
          </div>
          <div className="Frame13" style={{ width: 425, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div className="Group50" style={{ width: 425, height: 60, position: 'relative' }}>
              <div className="Rectangle16" />
              <button className='googleloginbutton' onClick={handleGoogleLogin}>Sign In With Google</button>
              <div className="Google" style={{ width: 26.12, height: 28.36, left: 26, top: 14, position: 'absolute' }}></div>
              <div className="SignInWithGoogle" style={{ width: 153.72, height: 26.18, left: 150, top: -85, position: 'absolute', color: 'black', fontSize: 19, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}></div>
            </div>
            <img className="Google3" style={{ width: 40, height: 40, left: 20, top: 440, position: 'absolute', borderRadius: 50 }} src={googleLogo} />
          </div>
          <div className="Frame18" style={{ width: 423, height: 55, position: 'relative' }}>
            <div className="Group50" style={{ position: 'absolute' }}>
              <FacebookLogin
                appId={facebookAppId}
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookLogin}
                cssClass="facebookloginbutton"
                // icon={<img src={facebookLogo} alt="Facebook" style={{ width: '24px', height: '24px', marginRight: '8px' }} />}
                textButton="Sign In With Facebook"
              />
            </div>
            <img className="FacebookLogo3" style={{ width: 44, height: 40, left: 19, top: -93, position: 'absolute', borderRadius: 50 }} src={facebookLogo} />
          </div>
        </div>
      </div>
      <div className="GetItStraight" style={{ left: 113, top: 508, position: 'absolute', color: 'black', fontSize: 35, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Get IT straight</div>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default MainApp;
