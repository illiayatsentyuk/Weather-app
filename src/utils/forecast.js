import axios from "axios";

const forecast = (place, lon, lat, callback) => {
  const URL_FOR_WEATHER = `http://api.weatherstack.com/current?access_key=baa56516639eb301ea3fbc3e17c80d0f&query=${lat},${lon}`;
  axios
    .get(URL_FOR_WEATHER)
    .then(({ data }) => {
      callback(
        undefined,
        `It is currently ${data.current.temperature} degrees. There is ${data.current.humidity}% humidity!`
      );
    })
    .catch((err) => callback("ERROR", undefined));
};

export default forecast;
