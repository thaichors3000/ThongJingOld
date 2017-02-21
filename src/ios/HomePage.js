import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import base from './../../styles/base';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[base.container, base.centering]}>
        <Button
          style={[base.button, base.primaryButton, { marginBottom: 40 }]}
          textStyle={[base.buttonText, base.primaryButtonText]}
          onPress={() => Actions.barcodePage({ role: this.props.role })}>
          ស្គែនលេខកូដ
        </Button>
        <Button
          style={[base.button, base.secondaryButton]}
          textStyle={[base.buttonText, base.secondaryButtonText]}
          onPress={() => Actions.inputCodePage({ role: this.props.role })} >
          បញ្ចូលលេខកូដ
        </Button>
      </View>
    );
  }
}
