/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from 'moment';

import { DatePicker, Select } from "antd";
import { useState } from 'react';
import { Option } from 'antd/es/mentions';

const LastStepForm = ({data, updateFieldHandler}) => {
    const [selectedDate, setSelectedDate] = useState('');

    const disabledDates = [
        moment('2024-05-22'),
        moment('2024-05-30'),
        moment('2024-05-24'),
        moment('2024-05-23'),
        moment('2024-06-03'),
      ];

      const isDateDisabled = (current) => {
        const isPastDate = current && current < moment().startOf('day');
        const isSpecificDisabledDate = disabledDates.some(disabledDate => current && current.isSame(disabledDate, 'day'));
        return isPastDate || isSpecificDisabledDate;
      };
      
    return (
    
        <div className='form-control'> 
          <h4>Please select a date below and time to schedule your free inspection</h4>
          <p>*If you do not see a specific time slot that you want, that means that it is not available</p>
            <DatePicker
             onChange={(value, valueYear)=>{  
                updateFieldHandler("daySelected", valueYear)
               setSelectedDate(valueYear)
            }} disabledDate={isDateDisabled} />
       
        
        <label htmlFor="problemOccurring">Please select an available timeslot</label>
        <Select  value={data.hourSelected || ""}
                onChange={(e) =>{
                     updateFieldHandler("hourSelected", e)
                     }}>
                    <Select.Option value="08:00 AM">08:00 AM - 09:00 AM</Select.Option>
                    <Select.Option value="09:00 AM">09:00 AM - 10:00 AM</Select.Option>
                    <Select.Option value="10:00 AM">10:00 PM - 11:00 AM</Select.Option>
                    <Select.Option value="11:00 AM">11:00 AM- 12:00 PM</Select.Option>
                    <Select.Option value="12:00 PM">12:00 PM - 01:00 PM</Select.Option>
                    <Select.Option value="01:00 PM">01:00 PM - 02:00 PM</Select.Option>
                    <Select.Option value="02:00 PM">2:00 PM - 03:00 PM</Select.Option>
                    <Select.Option value="03:00 PM">03:00 PM - 04:00 PM</Select.Option>
                    <Select.Option value="04:00 PM">04:00 PM - 05:00 PM</Select.Option>
                    <Select.Option value="05:00 PM">05:00 PM - 06:00 PM</Select.Option>
                    <Select.Option value="06:00 PM">06:00 PM - 07:00 PM</Select.Option>
         </Select>
         <p>*Note: If you need assistance or encounter any problems, please contact 510-277-3303</p>

    </div>
    
    )
}
export default LastStepForm;