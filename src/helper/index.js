const bcrypt = require("bcrypt");
const axios = require("axios");

const {
  APP_SECRET,
  TEMP_SECRET
} = require("../config");

module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };


//Raise Events
module.exports.PublishAuthEvent = async (payload) => {
  const res = axios.post("http://localhost:8000/app-events", {
    payload,
  });
};

module.exports.PublishReportEvent = async (payload) => {
  const res = axios.post("http://localhost:8000/report/app-events", {
    payload,
  });
};

module.exports.PublishPegawaiEvent = async (payload) => {
 await axios.post('http://localhost:8000/pegawai/app-events', { payload })
  .then(response => {
    result = response.data.data; // Store the response in the 'test' variable
  })
  .catch(error => {
    console.log(error.message)
    result = {}
  });
  return result;
};