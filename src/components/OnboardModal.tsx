import {Modal} from 'react-bootstrap'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image'
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage, auth, database } from '../utils/firebase.js'
import { doc, setDoc } from "firebase/firestore"; 
import '../css/file_input.css'
import '../css/onboard.css'
//import '../css/text.css'
import { CameraAlt } from '@mui/icons-material'

const ModalComponent = (props) => {
    const {user, showToastMessage, showSnackbarMessage, show, setShow, setOnboarded} = props
    const [selectedImage, setSelectedImage] = useState(user != null ? user.photoURL : '');
    const [displayName, setDisplayName] = useState(user != null ? user.displayName : '')
    const [gender, setGender] = useState("")
    const [preference, setPreference] = useState("")
    const [contact, setContact] = useState("")
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(false)

    useEffect(()=>{
      if(user){ 
        setDisplayName(user.displayName.toLowerCase().split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ').split(' ')[0])
        setSelectedImage(user.photoURL)
      }
    }, [user])

    const reloadSrc = e => { 
        e.target.src = user.photoURL;
    }

    const updatePhoto = async (event) => {
      const file = event.target.files[0]
      const storageRef = ref(storage, 'avatars/' + file)
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setSelectedImage(url)
      showSnackbarMessage("Gorgeous! Well, probably.")
    }

    const submitData = async () => {
      console.log(gender, preference, contact, message)
      if(gender == "" || preference == "" || contact == "" || message == ""){
        showSnackbarMessage("Please enter all the requested info!")
      } else {
        setDisabled(true)
        const db = database;
        const uid = auth.getAuth().currentUser.uid;
        await setDoc(doc(db, "users", uid), {
          uid,
          displayName,
          profileImage: selectedImage,
          gender,
          preference,
          contact,
          message,
          survey: Array(40).fill(-1),
          match: ""
        });
        setOnboarded(true)
        setShow(false)
      }
    }

    return (
     <Modal show={show} className="my-modal-2">
        <Modal.Header>
          <Modal.Title style={{color: 'white', fontFamily: 'Snell Roundhand, cursive', fontWeight: 'bold'}}>Welcome, {displayName}! Let's get you started!</Modal.Title>
        </Modal.Header>
        <div style={{marginLeft: '5%', marginTop : '5%', marginBottom : '5%'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Image style={{width: 100, height: 100, alignSelf: 'center'}} src={selectedImage} onError={reloadSrc} roundedCircle /> 
            <div>
              <input type="file" id="file" className='file_style' onChange={updatePhoto} />
              <label htmlFor="file" style={{backgroundColor: '#3f51b5',
              color: '#e3f2fd',
                padding: '1%',
                borderRadius: 5
                }}>
                  <CameraAlt />
              </label>
            </div>
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" style={{color: 'white'}}>You are a:</FormLabel>
            <RadioGroup
                onChange={(e)=>setGender(e.target.value)}
                value={gender}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel style={{color: 'white'}} value="female" control={<Radio />} label="Man" />
                <FormControlLabel style={{color: 'white'}} value="male" control={<Radio />} label="Woman" />
                <FormControlLabel style={{color: 'white'}} value="n/a" control={<Radio />} label="Prefer not to say" />
            </RadioGroup>
          </FormControl>
          <div style={{height: 10}} />

          <FormControl>
            <FormLabel style={{color: 'white'}} id="demo-radio-buttons-group-label">You'd like to be matched with a:</FormLabel>
            <RadioGroup
                onChange={(e)=>setPreference(e.target.value)}
                value={preference}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel style={{color: 'white'}} value="female" control={<Radio />} label="Man" />
                <FormControlLabel style={{color: 'white'}} value="male" control={<Radio />} label="Woman" />
                <FormControlLabel style={{color: 'white'}} value="either" control={<Radio />} label="Either" />
            </RadioGroup>
          </FormControl>
          <div style={{height: 10}} />


          <FormLabel style={{color: 'white'}} id="demo-radio-buttons-group-label">A way to contact you (social, number)</FormLabel>
          <br />
          <TextField
                  style={{backgroundColor: 'white'}} 
          value={contact}
          onChange={(e)=>setContact(e.target.value)}
          maxRows={1}
          id="standard-number"
          label="Social/number"
          type="text"
          inputProps={{ maxLength: 30 }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <br />
        <div style={{height: 10}} />

        
        <FormLabel style={{color: 'white'}}  id="demo-radio-buttons-group-label">A message to your future match:</FormLabel>
        <br />
        <TextField
        style={{backgroundColor: 'white'}} 
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          multiline
          inputProps={{ maxLength: 200 }}
          id="standard-number"
          label="Message"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <br />
        <div style={{height: 10}} />

        </div>

      
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{backgroundColor: '#0d6efd'}} disabled={disabled} variant="contained" onClick={submitData} >Submit</Button>
      </div>
      <div style={{height: 10}} />

    </Modal>
    )
}

export default ModalComponent