import { useState, useEffect } from 'react'
import {vapi, startAssistant, stopAssistant} from "./ai"


function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
      })
      .on("call-end", () => {
        setStarted(false);
        setLoading(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level) => {
        setVolumeLevel(level);
      });
  }, []);


  

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleStart = () => {}

  const showForm= true
  const allFieldsFilled = firstName && lastName && email && phoneNumber

  return (
    <>
      <div className='app-container'>
        {showForm && <>
          <h1>Contact Details (Required)</h1>
          <input
           type='text' 
           placeholder='First Name' 
           value={firstName} 
           className='input-field' 
           onChange={handleInputChange(setFirstName)}
          />
          <input
           type='text' 
           placeholder='Last Name' 
           value={lastName} 
           className='input-field' 
           onChange={handleInputChange(setLastName)}
          />
          <input
           type='text' 
           placeholder='Email Address' 
           value={email} 
           className='input-field' 
           onChange={handleInputChange(setEmail)}
          />
          <input
           type='tel' 
           placeholder='Phone Number' 
           value={phoneNumber} 
           className='input-field' 
           onChange={handleInputChange(setPhoneNumber)}
          />

          {!started && (
            <button
              onClick={handleStart}
              disabled={!allFieldsFilled}
              className='button'
            >
              Start Interview Call
            </button>
          )}

        </>}
      </div>
    </>
  )
}

export default App
