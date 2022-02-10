import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Image} from 'react-bootstrap'
import { auth } from '../utils/firebase.js';

const LandingPage = () => {
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/main',
        signInOptions: [
          auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD
        ],
    };
    return (
        <div style={{backgroundImage: `url('https://images.unsplash.com/photo-1626060490950-fabf0d72ca8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWNsYXxlbnwwfHwwfHw%3D&w=1000&q=80')`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>
            <p style={{fontFamily: 'Snell Roundhand, cursive', textAlign: 'center', fontWeight: 'bold', fontSize: 50, color: 'white', paddingTop : 100}}>Valentine's</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image src="https://www.pngplay.com/wp-content/uploads/12/Hearts-Transparent-PNG.png" style={{height: 150, width: 150}}/>
            </div>
            <p style={{fontFamily: 'Snell Roundhand, cursive', textAlign: 'center', fontWeight: 'bold', fontSize: 50, color: 'white'}}>Matchmaker</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1200px-UCLA_Bruins_logo.svg.png" style={{height: 150, width: 150}}/>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth.getAuth()} />
        </div>
    )
}

export default LandingPage;

