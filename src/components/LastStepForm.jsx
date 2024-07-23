/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import moment from "moment";

import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { indisponibleDates } from "../utils/indisponibleDates";
import { getDatas } from "../api/api";

const LastStepForm = ({ data, updateFieldHandler }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const fixedHours = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
  ];

  const fixedHour = [
    {
      name: "07:00 - AM",
      value: "07:00"
    },
    {
      name: "08:00 - AM",
      value: "08:00"
    },
    {
      name: "09:00 - AM",
      value: "09:00"
    },
    {
      name: "10:00 - AM",
      value: "10:00"
    },
    {
      name: "11:00 - AM",
      value: "11:00"
    },
    {
      name: "12:00 - PM",
      value: "12:00"
    },
    {
      name: "01:00 - PM",
      value: "01:00"
    },
    {
      name: "02:00 - PM",
      value: "02:00"
    },
    {
      name: "03:00 - PM",
      value: "03:00"
    },
    {
      name: "04:00 - PM",
      value: "04:00"
    },
    {
      name: "05:00 - PM",
      value: "05:00"
    },

  ]
  const [disponibleHours, setDisponibleHours] = useState(fixedHour);
  // const [schedules, setSchedules] = useState([]);

  // const getIndisponibleDates = async () => {
  //   const res = await getDatas();
  //   if (res) {
  //     setSchedules((prev) => ({ ...prev, res }));
  //   }
  //   setSchedules(res);
  // };

  // useEffect(() => {
  //   getIndisponibleDates();
  // }, []);

  // when we will call to api and get values but api isnt working yet
  const schedules = [
    {
      "company": "C1",
      "schedule": {
        "2024-07-23": ["09:00", "07:00", "03:00"],
        "2024-07-24": ["03:00", "05:00", "07:00"],
        "2024-07-25": ["05:00"],
        "2024-05-30": ["03:00"],
        "2024-06-03": ["05:00"]
      }
    },
    {
      "company": "C2",
      "schedule": {
        "2024-07-23": ["09:00", "06:00", "04:00"],
        "2024-05-28": ["04:00", "06:00", "10:00"],
        "2024-05-29": ["10:00", "04:00"],
        "2024-07-10": ["01:00"]
      }
    }
    ]

  function filtroDia(dia, agenda) {
    const horasPorDia = {};

    agenda.forEach((company) => {
      for (const data in company.schedule) {
        if (!horasPorDia[data]) {
          horasPorDia[data] = {};
        }

        company.schedule[data].forEach((hora) => {
          if (!horasPorDia[data][hora]) {
            horasPorDia[data][hora] = 0;
          }
          horasPorDia[data][hora]++;
        });
      }
    });

    const horasCertas = {};

    let result = fixedHour;

    if (horasPorDia[dia]) {
      result = fixedHour.filter(
        (hour) => horasPorDia[dia][hour.value] != agenda.length
      );
    }

    return result;
  }

  // transform the values in a iterable array
  let scheduleNew = [];
  schedules.map((data) => {
    let schedule = data.schedule;
    scheduleNew.push(schedule);
  });

  const filterValues = (array, filter) => {
    return array.filter((value) => !filter.includes(value));
  };

  const extractDates = (schedules) => {
    const dates = [];
    schedules.forEach(company => {
      Object.keys(company.schedule).forEach(date => {
        if (!dates.includes(date)) {
          dates.push(date);
        }
      });
    });
    return dates;
  };
  
  const isDateDisabled = (current) => {
    let disponibleDates = extractDates(schedules)
    console.log(disponibleDates) 
    
    const formattedCurrent = current && current.toISOString().slice(0, 10);
     return !disponibleDates.includes(formattedCurrent);
  };



  return (
    <div className="form-control">
      <h4>
        Please select a date below and time to schedule your free inspection
      </h4>
      <p style={{ color: "#1a1f36", paddingBottom: "10px"}}>
        *If you do not see a specific time slot that you want, that means that
        it is not available
      </p>
      {schedules.length > 0 && (
        <DatePicker
          // value={data.daySchedule || ""}
          onChange={(value, valueYear) => {     
            setDisponibleHours(fixedHours);
            updateFieldHandler("daySchedule", valueYear);
            setSelectedDate(valueYear);
            const diasFiltrados = filtroDia(valueYear, schedules);
            setDisponibleHours(diasFiltrados);
          }}
          disabledDate={isDateDisabled}
        />
      )}

      <label
        htmlFor="problemOccurring"
        style={{ paddingTop: "2rem", fontSize: "1rem" }}
      >
        Please select an available timeslot
      </label>
      <Select
        value={data.hourSchedule || ""}
        disabled={disponibleHours.length == 0 ? true : false}
        onChange={(e) => {
          updateFieldHandler("hourSchedule", e);
        }}
      >
        {disponibleHours.map((e) => {
          return (
            <Select.Option key={e.value} value={e.value}>
              {e.name}
            </Select.Option>
          );
        })}
      </Select>
      <p>
        *Note: If you need assistance or encounter any problems, please contact
        510-277-3303
      </p>
    </div>
  );
};
export default LastStepForm;
