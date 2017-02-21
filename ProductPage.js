import React, { Component } from 'react';
import { Image, ScrollView, Alert, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import Communications from 'react-native-communications';

import baseStyle from './style';
import ProductHeader from './ProductHeader';
import ProductDetail from './ProductDetail';
import ProductPrice from './ProductPrice';
import ProductCall from './ProductCall';

const apiKey = '';
const productSpreadsheetId = '';
const ipSpreadsheetId = '';
const sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
const productUrl = `${sheetUrl}${productSpreadsheetId}/values/Sheet1?key=${apiKey}`;
const ipUrl = `${sheetUrl}${ipSpreadsheetId}/values/Sheet1?key=${apiKey}`;

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = { isFound: false, data: [] };
  }

  isAdmin() {
    return this.props.role === 'Admin';
  }

  isSeller() {
    return this.props.role === 'Seller';
  }

  isClient() {
    return this.props.role === 'Client';
  }

  componentWillMount() {
    this.getProduct();
  }

  render() {
    let phoneCall = null;
    let wholesalePrice = null;
    let content = this.state.data.map(obj => <ProductDetail key={obj.name} name={obj.name} value={obj.value} />);

    if (this.isAdmin() || this.isSeller()) {
      phoneCall = (
        <Button
          style={style.callBtn}
          onPress={() => Communications.phonecall(this.state.phone, true)} >
          <Image
            style={{ height: 22, width: 22 }}
            source={require('./phone-receiver.png')} />
        </Button>
      );
    }

    if (this.isAdmin()) {
      wholesalePrice = <ProductDetail name="តំលៃដើម" value={this.state.wholesale_price} />;
    }

    if (this.state.isFound) {
      return (
        <View style={style.container}>
          <ScrollView>
            <View style={style.header}>
              <ProductHeader name="លេខកូដ" value={this.state.code} />
              <ProductHeader name="ឈ្មោះទំនិញ" value={this.state.name} />
              <ProductPrice name="តំលៃ" value={this.state.price} />
            </View>
            {wholesalePrice}
            {content}
          </ScrollView>

          {phoneCall}

          <View style={style.footer}>
            <Button
              style={style.footerBtn}
              textStyle={style.footerTextStyle}
              onPress={() => Actions.barcodePage({ role: this.props.role })}>
              ស្គែនលេខកូដ
            </Button>
            <View style={style.footerDivider}></View>
            <Button
              style={style.footerBtn}
              textStyle={style.footerTextStyle}
              onPress={() => Actions.inputCodePage({ role: this.props.role })}>
              បញ្ចូលលេខកូដ
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={baseStyle.containerCentering}>
          <ActivityIndicator
            animating={true}
            style={{ padding: 8, height: 80 }}
            size="large"
          />
        </View>
      );
    }
  }

  getProduct() {
    fetch(productUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let code = this.props.code;
      let rowKey = responseJson.values.shift();
      let row = responseJson.values.find(row => row[0].toLowerCase() === code.toLowerCase());

      if (row) {
        let data = [];
        for (let i = 5; i < row.length; i++) {
          data.push({ name: rowKey[i], value: row[i] });
        }

        this.setState({
          code: row[0],
          name: row[1],
          price: `${row[2]} $`,
          phone: row[3],
          wholesale_price: `${row[4]} $`,
          data: data,
          isFound: true,
        });
      } else {
        alertNotFound(code, this.props.role);
      }

      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      alert('មិនអាចទាញទិន្នន័យបាន');
    });
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: 54,
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 64,
  },
  header: {
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    paddingTop: 10,
  },
  callBtn: {
    position: 'absolute',
    right: 20,
    bottom: 84,
    width: 64,
    height: 64,
    borderRadius: 100 / 2,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    flex: 1,
    bottom: 0,
    position: 'absolute',
    height: 64,
    left: 0,
    right: 0,
    borderRadius: 0,
    borderTopWidth: 1,
    borderColor: '#E0F2F1',
  },
  footerBtn: {
    flex: 1,
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: '#039BE5',
    height: 64,
  },
  footerTextStyle: {
    color: '#FFF',
  },
  footerDivider: {
    backgroundColor: '#29B6F6',
    width: 1,
  },
});

function alertNotFound(code, role) {
  let title = 'រកមិនឃើញលេខកូដ';
  let message = `លេខកូដផលិតផល: "${code}" មិនត្រូវបានរកឃេីញ`;
  let option = { text: 'យល់ព្រម', onPress: () => Actions.homePage({ role: role }) };

  Alert.alert(title, message, [option]);
}
