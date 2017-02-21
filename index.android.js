import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  BackAndroid,
  Alert
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import NetworkInfo from 'react-native-network-info';

import HomePage from './HomePage';
import BarcodePage from './BarcodePage';
import ProductPage from './ProductPage';
import InputCodePage from './InputCodePage';

import baseStyle from './style';

class ThongJing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null,
      isLoaded: false,
      macAddress: DeviceInfo.getMacAddress(),
      ip: null,
    };

    NetworkInfo.getIPAddress((ip) => {
      this.setState({
        ip: ip,
      });
    });
  }

  componentWillMount() {
    this.loadRoles();
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Router
          navigationBarStyle={style.navigationBarStyle}
          titleStyle={style.titleStyle}
          barButtonIconStyle={style.barButtonIconStyle} >

          <Scene
            key="homePage"
            component={HomePage}
            title="ថុង ជីង" initial
            role={this.state.role}
            type="reset" />
          <Scene
            key="barcodePage"
            component={BarcodePage}
            title="ស្គែនលេខកូដផលិតផល"
            type="reset" />
          <Scene
            key="inputCodePage"
            component={InputCodePage}
            title="បញ្ចូលលេខកូដផលិតផល"
            type="reset" />
          <Scene
            key="productPage"
            component={ProductPage}
            title="ព័ត៌មានលំអិតពីផលិតផល"
            type="reset" />
        </Router>
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

  loadRoles() {
    let apiKey = 'AIzaSyD1-wLf4jdSWdYLRHnIcIh6TxQFIKROOA0';
    let id = '1at-LgWYPYycbdhTvCpyqWL2sTlgGvxK5h2q4lqUopto';
    let sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
    let url = `${sheetUrl}${id}/values/Sheet1?key=${apiKey}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let rowMac = responseJson.values.find(row => row[1] === this.state.macAddress);
      let rowIp = responseJson.values.find(row => row[0] === this.state.ip);

      if (rowMac && !rowIp) {
        this.setState({ role: 'Admin', isLoaded: true });
        return;
      }

      if (rowMac && rowIp) {
        this.setState({ role: 'Seller', isLoaded: true });
        return;
      }

      if (!rowMac && rowIp) {
        this.setState({ role: 'Client', isLoaded: true });
        return;
      }

      showRoleNotFound();
    })
    .catch((error) => {
      console.log(error);
      alert('មិនអាចទាញទិន្នន័យបាន');
    });
  }
}

function showRoleNotFound() {
  const title = 'គ្មានការអនុញ្ញាត';
  const message = 'សូមសាកសួរក្រុមហ៊ុន ថុង ជីង';

  Alert.alert(title, message, [
    {
      text: 'ចាកចេញ',
      onPress: () => BackAndroid.exitApp(),
    },
  ]);
}

const style = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: 'rgb(0, 150, 136)',
    elevation: 4,
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)',
    fontWeight: '400',
  },
  barButtonIconStyle: {
    tintColor: 'rgb(255, 255, 255)',
  },
});

AppRegistry.registerComponent('ThongJing', () => ThongJing);
