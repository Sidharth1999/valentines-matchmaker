import React, {useState, useEffect} from 'react';

import { auth } from '../utils/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Survey from '../components/Survey.tsx';
import Match from '../components/Match.tsx';
import Modal from '../components/OnboardModal.tsx';
import InfoModal from '../components/InfoModal.tsx'
import MenuAppBar from '../components/AppBar.tsx';

//import TabsUnstyled from '@mui/base/TabsUnstyled';
//import {Tab, TabsList, TabPanel} from '../components/Tabs.tsx'
import Snackbar from '@mui/material/Snackbar';
import {Toast} from 'react-bootstrap'

import Tabs from 'react-bootstrap/Tabs';
import Tab  from 'react-bootstrap/Tab';
//import {Tab, Tabs} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { database as db} from '../utils/firebase.js'
import { getDoc, doc } from 'firebase/firestore';
import '../css/tabs.css';

const MainPage = () => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastHeader, setToastHeader] = useState("")
    const [toastStyle, setToastStyle] = useState({})
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarStyle, setSnackbarStyle] = useState({})
    const [user, setUser] = useState(null);
    const [match, setMatch] = useState("")
    const [surveyDone, setSurveyDone] = useState(false)
    const [onboarded, setOnboarded] = useState(false)
    const [surveyed, setSurveyed] = useState(false)
    const [activeTab, setActiveTab] = useState("0")

    auth.onAuthStateChanged(auth.getAuth(), async (u) =>{
      if(u != null && user == null) {
        console.log(u);
        setUser(u);
        const docRef = doc(db, "users", u.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        console.log(data, 'data from DB')
        if(data === undefined) {
            setShow(true)  
        } else {
            console.log(data["match"], 'match data')
            setMatch(data["match"])
            if(!data["survey"].includes(-1)){
                setSurveyDone(true)
            }
        }
      }
    })

    useEffect(async ()=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
      };
      /*fetch('https://reqres.in/api/posts', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));*/
      let data = await fetch('https://reqres.in/api/posts', requestOptions);
      console.log(data, "DATA");
      data = await data.json()
      console.log(data, "DATA2")
    }, [])

    const logOut = () => {
      auth.getAuth().signOut()
      navigate('/')
    }

    const showToastMessage = (header: string, message: string, style: any) => {
        setToastHeader(header)
        setToastMessage(message)
        setToastStyle(style)
        setShowToast(true)
        setTimeout(()=>setShowToast(false), 3000)
    }

    const showSnackbarMessage = (message: string, style: any) => {
        setSnackbarMessage(message)
        setSnackbarStyle(style)
        setShowSnackbar(true)
        setTimeout(()=>setShowSnackbar(false), 3000)
    }


    return (
      <div style={{height : '100%', position: 'fixed', overflow: 'hidden', backgroundColor: '#F2A900'}}>
          <div style={{height: '100%', position: 'relative'}}>
            <Snackbar
              open={showSnackbar}
              message={snackbarMessage}
            />
            <Modal setOnboarded={setOnboarded} show={show} setShow={setShow} style={{zIndex: 10}} user={user} showToastMessage={showToastMessage} showSnackbarMessage={showSnackbarMessage} />
            <Toast show={showToast} style={{position: 'absolute', zIndex: 30}} className="d-inline-block m-1" bg='primary'>
                <Toast.Header>
                    <strong className="me-auto">{toastHeader}</strong>
                </Toast.Header>
                <Toast.Body className={'text-white'}>{toastMessage}</Toast.Body>
            </Toast>
            <InfoModal setShowInfo={setShowInfo} showInfo={showInfo} />
            <MenuAppBar logOut={logOut} setShowInfo={setShowInfo} />
            <Tabs activeKey={activeTab} onSelect={(val)=>setActiveTab(val)} className="myClass">
                <Tab style={{backgroundColor: '#FF008A'}} eventKey="0" title="Match Survey">
                <Survey setSurveyed={setSurveyed} user={user} onboarded={onboarded} showSnackbarMessage={showSnackbarMessage} />
                </Tab>
                <Tab style={{backgroundColor: '#FF008A'}} eventKey="1" title="Your Match">
                <Match user={user} surveyed={surveyed} match={match} surveyDone={surveyDone} />
                </Tab>
            </Tabs>
          </div>
      </div>   
    );
}

export default MainPage;

