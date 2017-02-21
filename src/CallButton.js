import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import Communications from 'react-native-communications';
import Button from 'apsl-react-native-button';

import base from './../styles/base';

export default class CallButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={[base.iconButton, style.button]}
        onPress={() => Communications.phonecall(this.props.phone, true)} >
        <Image
          style={{ height: 22, width: 22 }}
          source={require('./img/phone.png')} />
      </Button>
    );
  }
}

const style = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
});
