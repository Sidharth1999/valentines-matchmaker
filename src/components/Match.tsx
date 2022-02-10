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
        if(match === "") return;
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
            <Image width={200} height={200} style={{alignSelf: 'center'}} src={photoURL ? photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlXu1PRj2exCGLzY08c-ng7cebVgeQZ4USJdcZPGKnmpPtqFiv5RYphLbm4fJYdul32w&usqp=CAU'} />
            {
                matched ?
                <>
                    <p style={{alignSelf: 'center'}}>
                        Your match is {name}
                    </p>
                    <p style={{alignSelf: 'center'}}>
                        "{message}"
                    </p>
                    <p style={{alignSelf: 'center'}}>
                        Social: {social}
                    </p>
                </> :
                <>
                    <p style={{alignSelf: 'center'}}>
                        {surveyDone || surveyed ? 'You are all set to be matched!' : 'Complete the survey <-'}
                    </p>
                    <p style={{alignSelf: 'center'}}>
                        Results will be released on the 13th of February at noon
                    </p>
                </>
            }  
        </div>
    )
}

export default Match;