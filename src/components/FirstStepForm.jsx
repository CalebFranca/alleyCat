/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Checkbox, Form, Input } from 'antd';

const FirstStepForm = ({data,updateFieldHandler}) => {
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
                <label htmlFor="lastName">Last Name:</label>
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

            <div className="form-control">
                <label htmlFor="name">Street Adress:</label>
                <Input 
                type="string"
                name="streetAdress"
                id="streetAdress"
                placeholder="Enter your Street Address"
                required
                value={data.streetAdress || ""}
                onChange={(e) => updateFieldHandler("streetAdress", e.target.value)}
                
                /> 
            </div>

            <div className="form-control">
                <label htmlFor="name">City</label>
                <Input 
                type="string"
                name="city"
                id="city"
                placeholder="Enter your City"
                required
                value={data.city || ""}
                onChange={(e) => updateFieldHandler("city", e.target.value)}
                
                /> 
            </div>

            <div className="form-control">
                <label htmlFor="name">Zip Code</label>
                <Input 
                type="string"
                name="zipCode"
                id="zipCode"
                placeholder="Enter your Zip Code"
                required
                value={data.zipCode || ""}
                onChange={(e) => updateFieldHandler("zipCode", e.target.value)}
                
                /> 
            </div>
        </div>
    )
}

export default FirstStepForm;