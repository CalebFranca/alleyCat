/* eslint-disable react/prop-types */
import { Flex, Progress } from 'antd';
const ProgressForm = ({progreesValue}) => (
  <Flex gap="small" vertical>
    <Progress showInfo={false} percent={progreesValue} />
  </Flex>
);
export default ProgressForm;