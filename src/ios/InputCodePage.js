import React, { Component } from 'react';
import { Alert, View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import base from './../../styles/base';

export default class InputCodePage extends Component {
  constructor(props) {
    super(props);

    this.state = { code: '' };
    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.state.code) {
      Actions.productPage({ code: this.state.code, role: this.props.role });
    }
  }

  render() {
    return (
      <View style={[base.container, base.centering]}>
        <Text style={base.label}>សូមបញ្ចូលលេខកូដផលិតផល</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={base.input}
            onChangeText={(code) => this.setState({ code })}
            onSubmitEditing={() => this.submit()}
            value={this.state.code}
            autoFocus
          />
        </View>

        <Button
          style={[base.button, base.primaryButton]}
          textStyle={[base.buttonText, base.primaryButtonText]}
          onPress={() => this.submit()}>
          ស្វែងរក
        </Button>
      </View>
    );
  }
}
