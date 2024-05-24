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
    console.error('Erro ao buscar sugestões:', error);
  }
};

