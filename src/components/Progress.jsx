/* eslint-disable react/prop-types */
import {  Progress } from 'antd';
const ProgressForm = ({progreesValue}) => (
    <Progress strokeColor="rgb(34 197 94)" trailColor='rgb(209 213 219)' showInfo={false} percent={progreesValue}  />
);
export default ProgressForm;