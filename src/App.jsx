/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import './App.css'
import FirstStepForm from './components/FirstStepForm'
import SecondStepForm from './components/SecondStepForm'
import LastStepForm from './components/LastStepForm'
import { useForm } from './hooks/useForm'
import { useCallback, useState } from 'react'
import {  sendData } from './api/api'
import ProgressForm from './components/Progress'
import Logo from './assets/SFRC-Logo.svg'
import { Spin, message, notification } from 'antd'
import { debounce } from 'lodash'
import axios from 'axios'



const formTemplate = {
  firstName: "",
  lastName: "",
  streetAdress: "",
  city: "",
  zipCode: "",

  email: "",
  phoneNumber: "",
  residenceOrBusiness: "",
  propertyHouse: "",
  landordName: "",
  landordNumber: "",
  notify_landlord: "",
  request_concerning: "",
  problemOccurring: "",
  onlyServiceIndoor: "",
  aboutUs: "",
  otherAboutUs: "",

  daySchedule: "",
  hourSchedule: ""
}


function App() {
    const [data, setData] = useState(formTemplate);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false)

    // updates the global value of the form for the last step
    const updateFieldHandler = (key, value) => {
      setData((prev)=> {
        return {...prev, [key]: value}
      })
    }

    const handleSubmit = async (e) => {
      setLoading(true)
      try {
          const response = await axios.post('http://localhost:5000/api/teste', e);
          message.success('FinishSchedule');
          changeStep(0)
          setData(formTemplate)
      } catch (error) {
          message.error('There was an error saving the form data!',4);
      }
      setLoading(false)
  };

  const saveForm = async (data) => {
      let res = await sendData(data).then((res)=> {
        console.log('response', res)
      })
  }


  const  FinsishForm = () => {
    console.log('its working', data)
    // if(data.daySchedule && data.hourSchedule != "") {
    //     handleSubmit(data)
    // }else{
    //   message.error('Fill in all the fields!');
    // }

    saveForm(data);

   
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
          if(data.firstName == "" || data.lastName == "" ||  data.streetAdress == "" || data.city == ""){
            message.error('Fill in all the fields!')
          }else {
              setDisabled(false)
              changeStep(currentStep + 1, e)
          }     
         }

         if(currentStep ==  1) {
           e.preventDefault();
           if (
            data.residenceOrBusiness === "" ||
            data.propertyHouse === "" ||
            data.request_concerning === "" ||
            data.problemOccurring === "" ||
            data.onlyServiceIndoor === "" ||
            data.aboutUs === ""
        ) {
            message.error('Fill in all the fields!');
        } else if (
            data.residenceOrBusiness === 'business' ||
            data.problemOccurring === 'outdoors' ||
            data.onlyServiceIndoor === 'no'
        ) {
            message.error('Sorry, please review your details to proceed.', 4);
        } else{
          changeStep(currentStep + 1, e)
        }}
        

        
        
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
                   <button  className='ant-btn'  type='submit'>Next</button>
                </div>
              ) : (
                <div className='control-buttons'>
                  <Spin spinning={loading}/>
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
