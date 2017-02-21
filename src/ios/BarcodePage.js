import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

import base from './../../styles/base';

import CloseButton from './../CloseButton';

export default class BarcodePage extends Component {
  constructor(props) {
    super(props);

    this.state = { isFound: false };
  }

  onBarCodeRead(data) {
    if (this.state.isFound) {
      return;
    }

    this.setState({ isFound: true });
    Actions.productPage({ code: data.data, role: this.props.role });
  }

  render() {
    return (
      <View>
        <Camera
          onBarCodeRead={(data) => this.onBarCodeRead(data)}
          captureAudio={false}
          style={style.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>

        <View style={style.buttonContainer}>
          <CloseButton />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  preview: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
