/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from 'moment';

import { DatePicker, Select } from "antd";
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import { indisponibleDates } from '../utils/indisponibleDates';
import { getDatas } from '../api/api';

const LastStepForm = ({data, updateFieldHandler}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const fixedHours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00']
    const [disponibleHours, setDisponibleHours] = useState(fixedHours);
    const [schedules, setSchedules] = useState([]);

    const getIndisponibleDates = async () => {
      const res = await getDatas();
      if(res){
        setSchedules(prev => ({...prev, res}))
      }
        setSchedules(res)

    }

   useEffect(()=>{
    getIndisponibleDates()

   },[])

     // when we will call to api and get values but api isnt working yet
    // const schedules = [
    //   {
    //     "company": "C1",
    //     "schedule": {
    //       "2024-05-28": ["05:00", "07:00", "03:00"],
    //       "2024-05-27": ["03:00", "05:00", "07:00"],
    //       "2024-05-31": ["05:00"],
    //       "2024-05-30": ["03:00"],
    //       "2024-06-03": ["05:00"]
    //     }
    //   },
    //   {
    //     "company": "C2",
    //     "schedule": {
    //       "2024-05-27": ["08:00", "06:00", "04:00"],
    //       "2024-05-28": ["04:00", "06:00", "10:00"],
    //       "2024-05-29": ["10:00", "04:00"],
    //       "2024-07-10": ["01:00"]
    //     }
    //   }
    //   ]

      function filtroDia(dia, agenda){
        const horasPorDia = {};

        agenda.forEach(company => {
          for(const data in company.schedule){
            if(!horasPorDia[data]){
              horasPorDia[data] = {};
            }

            company.schedule[data].forEach(hora => {
              if(!horasPorDia[data][hora]){
                horasPorDia[data][hora] = 0;
              }
              horasPorDia[data][hora]++;
            });
          }
        })

        const horasCertas = {};

        let result = fixedHours;

        if(horasPorDia[dia]){
          result = fixedHours.filter(hour => horasPorDia[dia][hour] != agenda.length);
        }

        return result;
      }

      // transform the values in a iterable array
      let scheduleNew = [];
      schedules.map((data)=> {
         let schedule = data.schedule;
          scheduleNew.push(schedule)
      })
    
    const filterValues = (array, filter) => {
      return array.filter(value => !filter.includes(value));
    };

      const isDateDisabled = (current) => {
        const isPastDate = current && current < moment().startOf('day');
        return isPastDate
      };
      
    return (
    
        <div className='form-control'> 
          <h4>Please select a date below and time to schedule your free inspection</h4>
          <p style={{color: "#1a1f36"}}>*If you do not see a specific time slot that you want, that means that it is not available</p>
          {schedules.length > 0 &&  <DatePicker
            // value={data.daySchedule || ""}
             onChange={(value, valueYear)=>{  
                setDisponibleHours(fixedHours)
                updateFieldHandler("daySchedule", valueYear)
                setSelectedDate(valueYear)
                const diasFiltrados = filtroDia(valueYear, schedules)
                setDisponibleHours(diasFiltrados)
            }} disabledDate={isDateDisabled} /> }
           
       
        <label htmlFor="problemOccurring">Please select an available timeslot</label>
        <Select  value={data.hourSchedule || ""}
                 disabled={disponibleHours.length == 0 ? true : false}
                onChange={(e) =>{
                     updateFieldHandler("hourSchedule", e)
                     }}>
                      {disponibleHours.map((e)=> {
                        
                        return (<Select.Option key={e} value={e}>{e}</Select.Option>)
                        
                      })}
         </Select>
         <p>*Note: If you need assistance or encounter any problems, please contact 510-277-3303</p>
    </div>   
    )
}
export default LastStepForm;