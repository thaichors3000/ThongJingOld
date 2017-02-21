import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import baseStyle from './style';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.gotoBarcodePage = this.gotoBarcodePage.bind(this);
    this.gotoInputCodePage = this.gotoInputCodePage.bind(this);
  }

  gotoBarcodePage() {
    Actions.barcodePage({ role: this.props.role });
  }

  gotoInputCodePage() {
    Actions.inputCodePage({ role: this.props.role });
  }

  render() {
    return (
      <View style={baseStyle.containerCentering}>
        <Button
          style={baseStyle.buttonBarcodeStyle}
          textStyle={baseStyle.buttonBarcodeTextStyle}
          onPress={() => this.gotoBarcodePage()} >
          ស្គែនលេខកូដ
        </Button>
        <Button
          style={baseStyle.buttonInputCodeStyle}
          textStyle={baseStyle.buttonInputCodeTextStyle}
          onPress={() => this.gotoInputCodePage()} >
          បញ្ចូលលេខកូដ
        </Button>
      </View>
    );
  }

}
