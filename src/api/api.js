/* eslint-disable no-unused-vars */
import axios from 'axios';

export const getAddressFromZipCode = async (zipCode) => {
  try {
    const response = await axios.get(`http://api.zippopotam.us/us/${zipCode}`);
    return response.data;
  } catch (error) {
    console.error("Invalid ZIP Code or API error:", error);
    return null;
  }
};

