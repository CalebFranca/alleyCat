/* eslint-disable no-unused-vars */
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const DateTeste = () => {

    const dados = [
        {
        "date": "2024-05-18",
        "times": ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
    },
    {
        "date": "2024-05-19",
        "times": ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
    },
    ]
     
    const disabledDate = (current) => {
        // Bloqueia datas passadas
        if (current && current < moment().endOf('day')) {
          return true;
        }
        
        // Bloqueia datas específicas 
        const disabledDates = [
          moment('2023-05-18', 'YYYY-MM-DD'),
          moment('2024-05-19', 'YYYY-MM-DD'),
        ];
        
        if (current && disabledDates.includes(`${current.$y}-${current.$M}-${current.$D}`)) {
          return true;
        }
        
        return false;
      };

     return(
            <>
        <Space direction="vertical">
            <DatePicker disabledDate={(disabledDate)=>console.log('teste aqui', disabledDate)} onChange={onChange} />
            <button>teste</button>
        </Space>
        </>
        )
}
export default DateTeste;