import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BarcodeScanner from 'react-native-barcodescanner';
import Button from 'apsl-react-native-button';
import Camera from 'react-native-camera';

import baseStyle from './style';

export default class BarcodePage extends Component {
  constructor(props) {
    super(props);

    this.state = { isFound: false };
    this.onBarCodeReadHandler = this.onBarCodeReadHandler.bind(this);
  }

  onBarCodeReadHandler(e) {
    if (this.state.isFound) {
      return;
    }

    this.setState({ isFound: true });
    Actions.productPage({ code: e.data, role: this.props.role });
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  gotoHomePage() {
    Actions.homePage({ role: this.props.role });
  }

  render() {
    return (
      <View style={baseStyle.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}

          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>

          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    left: 0,
    height: 64,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    width: 64,
    height: 64,
    borderRadius: 100 / 2,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 4,
  },
});
