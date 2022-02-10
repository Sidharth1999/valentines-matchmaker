import {Modal, Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import '../css/modal.css';

const InfoModalComponent = (props) => {
    const {showInfo, setShowInfo} = props
    return (
     <Modal show={showInfo} className="my-modal">
        <Modal.Header>
          <Modal.Title style={{color: 'white', textAlign: 'center', alignSelf: 'center'}}>Greetings!</Modal.Title>
        </Modal.Header>
        <div style={{marginLeft: '5%', marginTop : '5%', marginBottom : '5%'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image style={{width: 733 * 0.2, height: 877 * 0.2, alignSelf: 'center'}} src={require('../assets/me.jpg')} /> 
          </div>
        </div>
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            Hi everyone! My name is Sid, I'm a senior majoring in C.S at UCLA and I impulsively decided to create this matchmaking app over the weekend
            (while also cramming for midterms this week, so apologies if the app is a bit buggy) 
        </p>
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            I love engaging in projects like these and wanted to do this so I could give back a little to the Bruin community before I graduate.
        </p>
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            Some important things to know are that:
            <ol>
            <li>This is NOT in any official capacity affiliated with UCLA</li>
            <li>I obviously plan to delete all collected data after the matchmaking. The app only collects very basic 
            things like your name and profile picture. </li>
            <li>I cannot guarantee that you will be matched because of gender imbalances, but of course it's still worth entering the pool! </li>
            </ol>
        </p>
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>Reach out to me at sidharthr99@g.ucla.edu if there are any issues with the app.</p>
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            Also feel free to connect with me on instagram @siddy_boo1999 to chat about really anything interesting, always glad to 
            meet new people and have nice conversations :)
        </p>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
       <Button style={{backgroundColor: '#FF008A', fontWeight: 'bold'}} onClick={()=>props.setShowInfo(false)}>Done</Button>
      </div>
    </Modal>
    )
}

export default InfoModalComponent