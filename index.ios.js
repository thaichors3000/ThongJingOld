import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import NetworkInfo from 'react-native-network-info';
import Button from 'apsl-react-native-button';

import base from './styles/base';

import Role from './src/Role';

import Loader from './src/Loader';

import HomePage from './src/ios/HomePage';
import BarcodePage from './src/ios/BarcodePage';
import ProductPage from './src/ios/ProductPage';
import InputCodePage from './src/ios/InputCodePage';

class ThongJing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null,
      isLoaded: false,
      isFound: false,
      isError: false,
      uniqId: DeviceInfo.getUniqueID(),
      ip: null,
    };

    this.loadRole = this.loadRole.bind(this);
    this.successCallback = this.successCallback.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.retry = this.retry.bind(this);
  }

  componentWillMount() {
    NetworkInfo.getIPAddress((ip) => {
      this.setState({ ip: ip });
      this.loadRole();
    });
  }

  loadRole() {
    Role.load(this.state.uniqId, this.state.ip, this.successCallback, this.errorCallback);
  }

  successCallback(roleName) {
    if (roleName) {
      this.setState({ role: roleName, isFound: true });
    }

    this.setState({ isLoaded: true });
  }

  errorCallback(error) {
    this.setState({ isLoaded: true, isError: true });
  }

  retry() {
    this.setState({ isLoaded: false, isFound: false, isError: false });
    this.loadRole();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Loader />
      );
    }

    if (this.state.isError) {
      return (
        <View style={[base.container, base.centering, { marginTop: 0 }]}>
          <Text style={base.label}>ការទាញទិន្នន័យមានបញ្ហា</Text>
          <Text style={{ fontSize: 16, marginBottom: 50 }}>សូមសាកសួរក្រុមហ៊ុន ថុង ជីង</Text>

          <Button
            style={[base.button, base.primaryButton]}
            textStyle={[base.buttonText, base.primaryButtonText]}
            onPress={() => this.retry()}>
            សាកល្បងម្ដងទៀត
          </Button>
        </View>
      );
    }

    if (!this.state.isFound) {
      return (
        <View style={[base.container, base.centering, { marginTop: 0 }]}>
          <Text style={base.label}>គ្មានការអនុញ្ញាត</Text>
          <Text style={{ fontSize: 16 }}>សូមសាកសួរក្រុមហ៊ុន ថុង ជីង</Text>
          <Text style={{ fontSize: 16 }}>ជាមួយលេខសំគាល់ខាងក្រោម:</Text>
          <Text style={{ fontSize: 15, marginBottom: 50 }}>{this.state.uniqId}</Text>

          <Button
            style={[base.button, base.primaryButton]}
            textStyle={[base.buttonText, base.primaryButtonText]}
            onPress={() => this.retry()}>
            សាកល្បងម្ដងទៀត
          </Button>
        </View>
      );
    }

    return (
      <Router
        navigationBarStyle={base.nav}
        titleStyle={base.title}>

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
  }
}

AppRegistry.registerComponent('ThongJing', () => ThongJing);
