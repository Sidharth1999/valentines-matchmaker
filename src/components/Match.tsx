import React, {useState, useEffect} from 'react'
import Image from 'react-bootstrap/Image'
import {database as db} from '../utils/firebase.js'
import {doc, getDoc} from 'firebase/firestore'

const Match = (props) => {
    const {user, match, surveyDone, surveyed} = props
    const [matched, setMatched] = useState(match != "");
    const [social, setSocial] = useState("")
    const [message, setMessage] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [name, setName] = useState("")

    useEffect(()=>{
        fetchMatch()
    }, [match])

    const fetchMatch = async () => {
        const now = new Date()
        const release = new Date('Sun, 13 Feb 2022 12:00:00')
        if(now  < release) return;
        if(match == "") return;
        const docRef = doc(db, "users", match);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        console.log(data, 'data from DB match')
        if(data !== undefined) {
            setName(data.displayName)
            setSocial(data.contact)
            setMessage(data.message)
            setPhotoURL(data.profileImage)
            setMatched(true)
        }
    }

    return (
        <div style={{width: window.innerWidth, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Image width={200} height={200} style={{alignSelf: 'center', marginTop : 50}} src={photoURL ? photoURL : require('../assets/heart_q.jpeg')} />
            {
                matched ?
                <>
                    <p style={{textAlign: 'center', fontFamily: 'Snell Roundhand, cursive', color: 'white', fontWeight: 'bold', fontSize: 30, padding: 5}}>
                        Your match is {name}!
                    </p>
                    <p style={{textAlign: 'center', fontFamily: 'Snell Roundhand, cursive', color: 'white', fontWeight: 'bold', fontSize: 30, padding: 5}}>
                        Contact: {social}
                    </p>
                    <p style={{textAlign: 'center', fontFamily: 'Snell Roundhand, cursive', color: 'white', fontWeight: 'bold', fontSize: 20, padding: 5}}>
                        "{message}"
                    </p>                
                </> :
                <>
                    <p style={{textAlign: 'center', fontFamily: 'Snell Roundhand, cursive', color: 'black', fontWeight: 'bold', fontSize: 30, padding: 20}}>
                        {surveyDone || surveyed ? 'You are all set to be matched!' : 'Complete the survey <-'}
                    </p>
                    <p style={{textAlign: 'center', fontFamily: 'Snell Roundhand, cursive', color: 'black', fontWeight: 'bold', fontSize: 30, padding: 20}}>
                        Results will be released on the <span style={{color: 'white'}}>13th of February at noon</span>
                    </p>
                </>
            }  
        </div>
    )
}

export default Match;