
import config from '../constants/config';
import fetch from 'node-fetch';


var queryWit = function (text, n = 1) {
  console.log("Chennai");
  console.log(config.NEW_ACCESS_TOKEN);
  return fetch(
    'https://api.wit.ai/message?v=20180402&q='+text,
    {
      headers: {
        Authorization: `Bearer ${config.NEW_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    }
  ).then(res => res.json()).then(witResponseObj => {console.log("witResponseObj : ",JSON.stringify(witResponseObj)); return witResponseObj});
}

module.exports = {
  queryWit
};
