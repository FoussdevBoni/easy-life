import axios from 'axios';

const GEOCODING_API_KEY = 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA';

/**
 * Récupère les informations de localisation à partir des coordonnées.
 * @param {number} latitude - La latitude de la localisation.
 * @param {number} longitude - La longitude de la localisation.
 * @returns {Promise<Object>} - Un objet contenant les informations de la localisation.
 */
export const getGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODING_API_KEY}`
    );
    
    const data = response.data;

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const addressComponents = result.address_components;

      const getComponent = (types) => {
        const component = addressComponents.find(c => types.every(type => c.types.includes(type)));
        return component ? component.long_name : null;
      };

      return {
        formattedAddress: result.formatted_address,
        city: getComponent(['locality']),
        region: getComponent(['administrative_area_level_1']),
        country: getComponent(['country']),
        postalCode: getComponent(['postal_code']),
      };
    } else {
      throw new Error('No address found');
    }
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw error;
  }
};
