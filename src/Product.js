const apiKey = 'AIzaSyD1-wLf4jdSWdYLRHnIcIh6TxQFIKROOA0';
const id = '1a7goGl6fEepbS3AtHaIMIxXKyOCHQx6YiSXajC7P-yg';
const sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
const url = `${sheetUrl}${id}/values/Sheet1?key=${apiKey}`;

const Product = {
  findByCode: function (code, successCallback, errorCallback) {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let rowKey = responseJson.values.shift();
      let row = responseJson.values.find(row => row[0].toLowerCase() === code.toLowerCase());

      if (row) {
        let product = {
          code: row[0],
          name: row[1],
          price: `${row[2]} $`,
          phone: row[3],
          wholesale_price: `${row[4]} $`,
        };
        let data = [];
        for (let i = 5; i < row.length; i++) {
          data.push({ name: rowKey[i], value: row[i] });
        }

        return successCallback(product, data);
      } else {
        return successCallback();
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
  },
};

export default Product;
