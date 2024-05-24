/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import './App.css'
import FirstStepForm from './components/FirstStepForm'
import SecondStepForm from './components/SecondStepForm'
import LastStepForm from './components/LastStepForm'
import { useForm } from './hooks/useForm'
import { useCallback, useState } from 'react'
import { getAddressFromZipCode } from './api/api'
import ProgressForm from './components/Progress'
import Logo from './assets/SFRC-Logo.svg'
import { message, notification } from 'antd'
import { debounce } from 'lodash'
import axios from 'axios'


const formTemplate = {
  firstName: "",
  email: "",
  streetAdress: "",
  city: "",
  zipCode: "",
  lastName: "",
  problemOccurring: "",
  phoneNumber: "",
  businees: "Select an Option",
  propertyHouse: "",
  landordName: "",
  landordNumber: "",
  notify_landlord: "",
  aboutUs: "",
  otherAbout: "",
  onlyServiceIndoor: "",
  daySelected: "",
  hourSelected: ""
}


function App() {
    const [data, setData] = useState(formTemplate);
    const [disabled, setDisabled] = useState(false);

    // updates the global value of the form for the last step
    const updateFieldHandler = (key, value) => {
      setData((prev)=> {
        return {...prev, [key]: value}
      })
    }


  const  FinsishForm = () => {
    console.log('its working', data)
    if(data.hourSelected && data.daySelected != "") {
      message.success(`Thanks, ${data.firstName} ${data.lastName}, Scheduled for the ${data.daySelected} at ${data.hourSelected}.`)
    }
   
  }

    // each part of the form is divided into 3
    const formComponents = [
      <FirstStepForm data={data} updateFieldHandler={updateFieldHandler}/>,
      <SecondStepForm disabledNext={disabled} data={data} updateFieldHandler={updateFieldHandler}/>,
      <LastStepForm data={data} updateFieldHandler={updateFieldHandler}/>
    ]

    const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep} = useForm(formComponents)

    // api to take adress by ZIP code
    const handleLookup = async () => {
      const dataAdress = await getAddressFromZipCode(data.zipCode);
      if (dataAdress) {
        console.log('teste', dataAdress.places);
         } else {
        console.log('teste');
      }
    };
  
    

  return (
    <div className='box-geral'>
      <div  className='logo-container'>
          <header >
             <img  src={Logo} height={50}/>
          </header>
      </div>
          {/* <hr/> */}
    <div className='form-container'>
      <h3>Form for free inspection</h3>
      
      {
        currentStep == 0 ? (
          <>
          <p>Step 1 - Find Service Area</p>
          <ProgressForm progreesValue={33}/>
          </>
        ) : currentStep == 1 ? (
          <>
          <p>Step 2</p>
          <ProgressForm progreesValue={66}/>
          </>
        ) : currentStep == 2 ? (
          <>
          <p>Step 3 - Schedule Free Inspection</p>
          <ProgressForm progreesValue={100}/>
          </>
        ) : ''
      }
     
      <form onSubmit={(e) => {
          e.preventDefault();
         if(currentStep == 0) {
          changeStep(currentStep + 1, e)
         }

         if(currentStep == 1 || currentStep == 2) {
          e.preventDefault();
         
           changeStep(currentStep + 1, e)
         }
         
          }}>
        <div className="inputs-container">
             {currentComponent}
        </div>
      <div className="action">
          {!isFirstStep ? (
            <div className='control-buttons'>
             <button type='button' className='ant-btn black' onClick={()=> changeStep(currentStep - 1)}>Back</button>
           </div>
          ) : ''
        }
           
             {
              !isLastStep ? (
                <div className='control-buttons'>
                   <button className='ant-btn'  type='submit'>Next</button>
                </div>
              ) : (
                <div className='control-buttons'>
                  <button type='button' className='ant-btn' onClick={FinsishForm}>Schedule Appointment</button>
                </div>
              )
             }
        </div>
      </form>
    </div>
    </div>
  )
}

export default App
