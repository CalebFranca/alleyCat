/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AutoComplete, Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { REACT_APP_BING_MAPS_API_KEY } from '../config';
import { getZipValids } from '../api/api';
import { disponibleZips } from '../utils/disponibleZips';


const FirstStepForm = ({data,updateFieldHandler}) => {
    const [options, setOptions] = useState([]);
    const [valueSelected, setValueSelected] = useState([]);
    const[zips, setZips] = useState([]);
    const [invalidAddress, setInvalidAddress] = useState(false);

  

    const fetchZipAndAddress = async (query) => {  
        const apiKey = REACT_APP_BING_MAPS_API_KEY;
        const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&userLocation=36.7783,-119.4179&includeEntityTypes=Address&countryFilter=US&key=${apiKey}`;
       
        try {
          const response = await axios.get(url);
          if (response.data.resourceSets.length > 0) {

            if(response.data.resourceSets[0].resources[0].value){
                let valuesMapped = response.data.resourceSets[0].resources[0].value[0];

                
                let boolZip = false;


                disponibleZips.map((zip)=> {
               
                  if(zip == valuesMapped.address.postalCode){
                  
                   boolZip = true 
                 
                  }
                  return boolZip
                })


                if(boolZip == true) {
                  updateFieldHandler('city', valuesMapped.address.locality)
                  updateFieldHandler('zipCode', valuesMapped.address.postalCode)
                  setInvalidAddress(false)
                }else{
                  updateFieldHandler('city', "")
                  updateFieldHandler('zipCode', "")
                  setInvalidAddress(true)

                }
                
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      // const checkFieldsValid = (field) => {
      //   data.map((fieldMaped)=> {
      //      fieldMaped == field 
      //   })
      // }

    const setValidZip = () => {

    }

    const fetchSuggestions = async (query) => {
        const apiKey = REACT_APP_BING_MAPS_API_KEY;
        const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}, California&includeEntityTypes=Address&userRegion=US&countryFilter=US&key=${apiKey}`;
       
    
        try {
          const response = await axios.get(url);
          if (response.data.resourceSets.length > 0) {
            
            console.log('response aqui', response.data.resourceSets[0].resources[0].value)

            if(response.data.resourceSets[0].resources[0].value){
                        
                let valuesMapped = response.data.resourceSets[0].resources[0].value.map((option) => {
                    let teste = option.address
                    return teste;

                })

                   valuesMapped.map((value)=>{
                    if(value.postalCode != ""){
                      disponibleZips.map((zipValid)=> {
                        if(value.postalCode == zipValid) {
                          console.log('verdade', zipValid, value.postalCode)

                          updateFieldHandler('zipCode', value.postalCode)
                          updateFieldHandler('city', value.city)
                          
                        }
                      })
                      // console.log('diferente de nulo', value)
                    
                    }
                 
                   })
                // 
                setOptions(valuesMapped.map((value) => {
                  if(valuesMapped.postalCode != ""){
                    return { value: value.formattedAddress,
                      zip: value.postalCode
                }
                  }
                     
                }));
            }
           
          }
        } catch (error) {
          console.error('Error :', error);
        }
      };

      const onSelected = (e) => {
        fetchZipAndAddress(e)
      }

      const debouncedFetchSuggestions = useCallback(debounce((query) => fetchSuggestions(query), 300), []);

    return (
        <div> 
            <div className="form-control">
                <label className='label-name' htmlFor="firstName">First Name</label>
                <Input 
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your First Name"
                required
                value={data.firstName || ""}
                onChange={(e) => updateFieldHandler("firstName", e.target.value)}
                /> 
            </div>

            <div className="form-control">
                <label htmlFor="lastName">Last Name</label>
                <Input 
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your Last Name"
                required
                value={data.lastName || ""}
                onChange={(e) => updateFieldHandler("lastName", e.target.value)}
                
                /> 
            </div>

            <div className="form-control address">
                <label htmlFor="streetAdress">Street Adress</label>
                 <AutoComplete
                    onSelect={(e) =>{
                        onSelected(e)

                    }}
                    value={data.streetAdress || ""}
                    onSearch={(e) => debouncedFetchSuggestions(e)}
                    onChange={(e)=> {
                        // debouncedFetchSuggestions(e);
                        setInvalidAddress(false)
                        // checkFieldsValid(e)
                        updateFieldHandler("streetAdress", e)
                    }}
                    options={options}
                >
             <Input  value={data.streetAdress || ""} size="large" placeholder="Enter your Street Address" />
             
                </AutoComplete>
                
                
                
                             
            </div>
            {
              invalidAddress == true &&   <p>Sorry but we don't offer services on your address</p>
              
            }
           

            <div className="form-control city">
                <label htmlFor="name">City</label>
                <Input 
                 disabled={true}
                type="string"
                name="city"
                id="city"
                placeholder="Select your Street Address first!"
                required
                value={data.city || ""}
                onChange={(e) => updateFieldHandler("city", e.target.value)}
                /> 
            </div>
      

            <div className="form-control">
                <label htmlFor="name">Zip Code</label>
                <Input 
                disabled={true}
                type="string"
                name="zipCode"
                id="zipCode"
                placeholder="Select a compatible address!"
                required
                value={data.zipCode || ""}
                onChange={(e) => updateFieldHandler("zipCode", e)}
                /> 
            </div>
        </div>
    )
}

export default FirstStepForm;