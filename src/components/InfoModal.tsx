import {Modal, Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useState } from 'react';

const InfoModalComponent = (props) => {
    const {showInfo, setShowInfo} = props
    return (
     <Modal show={showInfo}>
        <Modal.Header>
          <Modal.Title>Greetings!</Modal.Title>
        </Modal.Header>
        <div style={{marginLeft: '5%', marginTop : '5%', marginBottom : '5%'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image style={{width: 100, height: 100, alignSelf: 'center'}} src={''} roundedCircle /> 
          </div>
        </div>
        <p style={{textAlign: 'center'}}>Text</p>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
      <Button variant="primary" onClick={()=>props.setShowInfo(false)}>Done</Button>
      </div>
    </Modal>
    )
}

export default InfoModalComponent