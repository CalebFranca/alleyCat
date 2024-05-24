/* eslint-disable no-unused-vars */
import { useState } from "react";

// addressLine: "812 California St"
// ​​​
// adminDistrict: "California"
// ​​​
// adminDistrict2: "San Joaquin County"
// ​​​
// countryRegion: "United States"
// ​​​
// countryRegionIso2: "US"
// ​​​
// formattedAddress: "812 California St, Escalon, California 95320"
// ​​​
// houseNumber: "812"
// ​​​
// locality: "Escalon"
// ​​​
// postalCode: "95320"
// ​​​
// streetName: "California St"


export function useForm(steps) {
    const [currentStep,setCurrentStep] = useState(0)

   function changeStep(i,evt) {
   console.log('numero de etapas', steps.length)
    if(evt) evt.preventDefault();
     
    if(i < 0 || i >= steps.length) return;

    setCurrentStep(i)
   }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,
        isLastStep: currentStep + 1 == steps.length ? true : false,
        isFirstStep: currentStep == 0 ? true : false 
    }
}