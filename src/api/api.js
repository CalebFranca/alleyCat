/* eslint-disable no-unused-vars */
import axios from 'axios';

export const getDatas = async () => {
  try {
    const response = await axios.post("https://func-dataanalytics.azurewebsites.net/api/getDates?code=ESmMSeuygB4_WNJqG9v4qAwx6fc8PrnzC3OetU9Zn18HAzFubaRW9Q%3D%3D");
    // console.log('datas indisponíveis aqui',response.data.data )
    return response.data.data;
  } catch (error) {
    console.error("Invalid data or API error:", error);
    return null;
  }
};

export const getZipValids = async () => {
  try {
    const response = await axios.get("https://func-dataanalytics.azurewebsites.net/api/getZips?code=ESmMSeuygB4_WNJqG9v4qAwx6fc8PrnzC3OetU9Zn18HAzFubaRW9Q%3D%3D");
    return response.data.data;
  } catch (error) {
    console.error("Invalid ZIP Code or API error:", error);
    return null;
  }
};

export const fetchSuggestions = async (query) => {
  const apiKey = '';
  const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const res = response.data.resourceSets[0].resources
    if (response.data.resourceSets.length > 0) {
      console.log();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const sendData = async ({data}) => {
  try {
    const response = await axios.post('https://func-dataanalytics.azurewebsites.net/api/sendSchedule?code=aL1FpokwHjQAjMkQQ0csrbCseyJp9Pw7U8tDTpodjNNzAzFu3se3Ag%3D%3D');

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

