const apiKey = '';
const id = '';
const sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
const url = `${sheetUrl}${id}/values/Sheet1?key=${apiKey}`;

const Role = {
  load: function (uniqId, ip, successCallback, errorCallback) {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let rowUniqId = responseJson.values.find(row => row[1] === uniqId);
      let rowIp = responseJson.values.find(row => row[0] === ip);

      if (rowUniqId && !rowIp) {
        return successCallback('Admin');
      }

      if (rowUniqId && rowIp) {
        return successCallback('Seller');
      }

      if (!rowUniqId && rowIp) {
        return successCallback('Client');
      }

      return successCallback();
    })
    .catch((error) => {
      errorCallback(error);
    });
  },
};

export default Role;
