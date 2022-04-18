import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Image} from 'react-bootstrap'
import { auth } from '../utils/firebase.js';
import backgroundImg from '../assets/backdrop.jpg';

const LandingPage = () => {
    const uiConfig = {
        signInFlow: 'redirect',
        signInSuccessUrl: '/main',
        signInOptions: [
            {
                provider: auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                  // Your requested scopes.
                  'https://www.googleapis.com/auth/plus.login'
                ],
                customParameters: {
                  // Forces account selection even when one account
                  // is available.
                  //hd: 'ucla.edu'
                }
              }
        ],
    };
    return (
        <div style={{backgroundImage:  `url(${backgroundImg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>
            <p style={{fontFamily: 'Snell Roundhand, cursive', textAlign: 'center', fontWeight: 'bold', fontSize: 50, color: 'white', paddingTop : 70}}>Valentine's</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image src={require('../assets/free_heart.png')} style={{height: 200, width: 200}}/>
            </div>
            <p style={{fontFamily: 'Snell Roundhand, cursive', textAlign: 'center', fontWeight: 'bold', fontSize: 50, color: 'white'}}>Match-maker</p>
            {/*<div style={{display: 'flex', justifyContent: 'center'}}>
            <Image src={require('../assets/ucla_bruins_logo.png')} style={{height: 125, width: 125}}/>
    </div>*/}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth.getAuth()} />
        </div>
    )
}

export default LandingPage;

