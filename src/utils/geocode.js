import axios from "axios";

const geocode = (address, callback) => {
  const URL_FOR_GEOCODING = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoiZHJvaWRlIiwiYSI6ImNscmo0aGt4MjA0YzkybG1ramI1aGlmMHMifQ.XRx6y9D3nrGAS7G4n_FWEg`;
  axios
    .get(URL_FOR_GEOCODING)
    .then(({ data }) => {
      const latitude = data.features[1].properties.coordinates.latitude;
      const longitude = data.features[1].properties.coordinates.longitude;
      callback(undefined, {
        lat: latitude,
        lon: longitude,
        place: data.features[1].properties.name,
      });
    })
    .catch((err) => {
      callback("ERROR", undefined);
    });
};
export default geocode;
