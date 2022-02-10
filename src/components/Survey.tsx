import React, {useEffect, useRef, useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import {Card, ListGroup, Button} from 'react-bootstrap'
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { ArrowBack, ArrowForward} from '@mui/icons-material'
import FloatText from './FloatText.tsx';
import FloatTextBig from './FloatTextBig.tsx'
import {database as db, auth} from '../utils/firebase.js';
import comment from '../utils/comments.js';
import { doc, getDoc, setDoc } from "firebase/firestore";
const survey = require('../survey.json')

function Question(props)
{
    const {question, setIndex, index, i, surveyState, setSurveyState, setComplete, showSnackbarMessage} = props;
    const select = (k) => {
        console.log(i, 'i')
        console.log(index.current, 'index')
        const newSurveyState = surveyState
        newSurveyState[i] = k
        console.log(newSurveyState, 'newSurveyState')
        comment(index.current, k + 1, showSnackbarMessage)
        setSurveyState(newSurveyState)
        if(!newSurveyState.includes(-1)) setComplete(true)
        setIndex(index.current+1)
        
    }
    return (
        <Card style={{position: 'relative', height: window.innerHeight * 0.7, backgroundColor: '#2D68C4', width: window.innerWidth}}>
            <FloatText text={question['question']} fontSize={20} />
            <ListGroup as="ul" style={{position: 'absolute', top : 150}}>
                {
                    question['options'].map((option, k) =>
                      <div style={{padding: '20px'}}>
                        <Button key={k} onClick={()=>select(k)} style={{textAlign: 'left', width: window.innerWidth, backgroundColor: surveyState[i] == k ? '#FF008A': '#0275d8', fontWeight: 'bold'}}>{option}</Button>
                      </div>
                    )
                }
            </ListGroup>
        </Card>
    )
}

const Survey = (props) => {

    const {showSnackbarMessage, user, onboarded, setSurveyed} = props
    const [index, setIndex] = useState(0)
    const [surveyState, setSurveyState] = useState([-1])
    const [surveyPages, setSurveyPages] = useState([-1])
    const [complete, setComplete] = useState(!surveyState.includes(-1))
    console.log(complete, !surveyState.includes(-1))
    const userData = useRef({})

    useEffect(()=>{
        fetchSurvey()
    }, [user, onboarded])

    const indexRef = useRef(index)

    const fetchSurvey = async () => {
        if(user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data()
            if(data != undefined){
                userData.current = data;
                setSurveyState(data['survey'])
                setComplete(!data['survey'].includes(-1))
                setSurveyPages(survey['survey'].map( (question, i) => 
                <Question 
                    setComplete={setComplete}
                    index={indexRef} 
                    i={i} 
                    surveyState={data['survey']} 
                    setSurveyState={setSurveyState}
                    showSnackbarMessage={showSnackbarMessage} 
                    setIndex={setIndex} 
                    key={i} 
                    question={question} 
                /> ))
            }
        }
    }

    const submitSurvey = async () => {
        console.log(surveyState, 'submitted survey')
        const uid = user.uid;
        await setDoc(doc(db, "users", uid), {
           ...userData.current,
           survey: surveyState
        });;
        setSurveyed(true)
        showSnackbarMessage("Answers have been saved!")
    }

    const Welcome = () => (
        <Card style={{position: 'relative', height: window.innerHeight * 0.7, backgroundColor: '#2D68C4', width: window.innerWidth}}>
            <FloatTextBig text={`Welcome to the Bruin Valentine's Matchmaker! Are you ready to start your match survey?`} fontSize={30} /> 
            <Button style={{backgroundColor: '#FF008A', width: '60', alignSelf: 'center', fontWeight: 'bold'}} onClick={()=>setIndex(1)}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <span>Get Started</span>
                <ArrowForward />
                </div>
            </Button>
        </Card>
    )
    const End = () => (
        <Card style={{position: 'relative', height: window.innerHeight * 0.7, backgroundColor: '#2D68C4', width: window.innerWidth}}>
            <FloatTextBig text={complete ? 'Thanks for finishing! You can go back and edit or otherwise save your answers' : 'You have reached the end of the survey ... but you did not finish!'} fontSize={30} /> 
            {complete? <Button style={{backgroundColor: '#FF008A', width: '60', alignSelf: 'center'}} onClick={submitSurvey}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <span style={{fontWeight: 'bold'}}>Save Answers</span>
                </div>
            </Button> : null}
        </Card>
    )
    const carouselPages = [<Welcome />, ...surveyPages, <End />]
    return (
        <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <Carousel
                autoPlay={false}
                NextIcon={<ArrowForward />}
                PrevIcon={<ArrowBack />}
                index={index}
                onChange={(val)=>{
                    setIndex(val)
                    indexRef.current = val
                }
            }
                
            >                                  
                {
                    
                    carouselPages
                }              
            </Carousel>
        </div>
    )

}

export default Survey;