/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useState } from "react";

/* eslint-disable no-unused-vars */
const SecondStepForm = ({data, updateFieldHandler}) => {
    const [valueAboutUs, setValueAboutUs] = useState('');
    const [problemOcurring, setProblemOcurring] = useState('');
    const [businees, setBusinees] = useState('');
    const [propertyHouse, setPropertyHouse] = useState('');

    return (
        <div> 
             <div className="form-control">
                <label htmlFor="email">Email</label>
                <Input 
                type="email"
                name="email"
                id="email"
                placeholder="Digite o seu email"
                required
                value={data.email || ""}
                onChange={(e) => updateFieldHandler("email", e.target.value)} 
                /> 
            </div>
            <div className="form-control">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input 
                type="phoneNumber"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Digite o seu phoneNumber"
                required
                value={data.phoneNumber || ""}
                onChange={(e) => updateFieldHandler("phoneNumber", e.target.value)} 
                /> 
            </div>
            <div className="form-control">
                <label htmlFor="business_residennce">Is this for a business or residence?</label>
                        <Select
                      
                        value={data.businees || ""}
                        onChange={(value) => {
                        updateFieldHandler("businees", value);
                        setBusinees(value);
                    }}
                >
                    <Option value="business">Business</Option>
                    <Option value="residence">Residence</Option>
                </Select>
                 {
                    businees =='business'  ? (
                        <p>
                        *Note: Sorry, we do not service commercial properties at this time
                        </p>
                    ) : ''
                 }
            </div>
            <div className="form-control">
                <label htmlFor="propertyHouse">Are you the Owner of the property OR Renter?</label>
                <Select value={data.propertyHouse || ""}
                onChange={(e) =>{
                     updateFieldHandler("propertyHouse", e)
                     setPropertyHouse(e)
                     }}>
                    <option value="renter">Renter</option>
                    <option value="owner">Owner</option>
                 </Select>
            </div>

            {
                propertyHouse == 'renter' ? (
                 <>
                    <div className="form-control">
                        <label htmlFor="landordName">Landlord's Name</label>
                        <Input 
                        type="landordName"
                        name="landordName"
                        id="landordName"
                        placeholder="Digite o seu landordName"
                        required
                        value={data.landordName || ""}
                        onChange={(e) => updateFieldHandler("landordName", e.target.value)} 
                        /> 
                    </div>

                    <div className="form-control">
                        <label htmlFor="landordNumber">Landlord's Phone Number</label>
                        <Input 
                        type="landordNumber"
                        name="landordNumber"
                        id="landordNumber"
                        placeholder="Digite o seu landordNumber"
                        required
                        value={data.landordNumber || ""}
                        onChange={(e) => updateFieldHandler("landordNumber", e.target.value)} 
                        /> 
                    </div>

                    <div className="form-control">
                        <label htmlFor="notify_landlord">Have you notified the landlord?</label>
                     <Select 
                      value={data.notify_landlord || ""}
                      onChange={(e) =>{
                           updateFieldHandler("notify_landlord", e)
                           }}
                     >
                            <Option value="yes">Yes- My Landlord has aggreed to this free estimate </Option>
                            <Option value="no">No - </Option>
                        </Select>
                    </div>
               </>
                ) : ''
            }

            
            

            <div className="form-control">
                <label htmlFor="request_concerning">Is this free inspection request concerning issues with rats or mice?</label>
                 <Select
                 value={data.request_concerning || ""}
                 onChange={(e) =>{
                      updateFieldHandler("request_concerning", e)      
                      }}
                 >
                    <Option value="yes">No - I have problems with others animals</Option>
                    <Option value="no">Yes (I think) - I have problems with rats and mice adn would like to exterminate them.</Option>
                 </Select>
            </div>

            <div className="form-control">
                <label htmlFor="problemOccurring">Where is the problem is occurring?</label>
                <Select value={data.problemOccurring || ""}
                onChange={(e) =>{
                     updateFieldHandler("problemOccurring", e)
                     setProblemOcurring(e)
                     }}>
                    <Option value="outdoors">Outdoors (yard, trees, bushes)</Option>
                    <Option value="inside">Inside(including the exterior of your house)</Option>
                    <Option value="indoors">Indoors and Outdoors</Option>
                 </Select>
                 {
                    problemOcurring =='outdoors'  ? (
                        <p>
                        *Note: We do not service outdoor areas such as yards, bushes and trees because that is considered within the natural habitat of
                         the animals and it would be illegal for us to service. We only service the indoor area of the service address requested 
                         (including the exterior of your home).
                        </p>
                    ) : ''
                 }
                
            </div>

            <div className="form-control">
                <label htmlFor="onlyServiceIndoor">Do you understand that we only service indoor areas?</label>
                 <Select 
                   value={data.onlyServiceIndoor || ""}
                   onChange={(e) =>{
                        updateFieldHandler("onlyServiceIndoor", e)
                        }}
                 >
                    <Option value="yes">No, I don't understand</Option>
                    <Option value="no">Yes, I understand</Option>
                 </Select>
            </div>

            <div className="form-control">
                <label htmlFor="aboutUs">How did you hear about us?</label>
                 <Select value={data.aboutUs || ""}
                onChange={(e) =>{
                     updateFieldHandler("aboutUs", e)
                     setValueAboutUs(e)
                     }}>
                    <Option value="google">Google</Option>
                    <Option value="yelp">Yelp</Option>
                    <Option value="diamond">Diamond Ciertified</Option>
                    <Option value="facebook">Facebook</Option>
                    <Option value="past">Past/Returning Customer</Option>
                    <Option value="magazine">Magazine Ad</Option>
                    <Option value="dirext">Direct Mail(Flyer/Postcard)</Option>
                    <Option value="local">Local Mailer Pack(e.g., Valpak)</Option>
                    <Option value="real_estate_agent">Referral: Real Estate Agent</Option>
                    <Option value="neghbor_friend_family">Referral: Neighbor, Friend or Family</Option>
                    <Option value="contractor">Referral: Contractor</Option>
                    <Option value="friend_family">Referral: Neighbor, Friend or Family</Option>
                    <Option value="other">Other</Option>
                 </Select>
                
            </div>
          { 
             valueAboutUs == 'other' ? (
                <div className="form-control">
                <label htmlFor="landordNumber">Please specify (Name of Referrer)</label>
                <TextArea
                maxLength={100} 
                type="otherAbout"
                name="otherAbout"
                id="otherAbout"
                placeholder="Digite o seu otherAbout"
                required
                value={data.otherAbout || ""}
                onChange={(e) => updateFieldHandler("otherAbout", e.target.value)} 
                /> 
            </div>
             ) : ''

          }
        </div>
    )
}

export default SecondStepForm;