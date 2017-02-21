import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import baseStyle from './style';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { code: '' };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler() {
    if (this.state.code) {
      Actions.productPage({ code: this.state.code, role: this.props.role });
    }
  }

  render() {
    return (
      <View style={baseStyle.containerCentering}>
        <Text style={style.text}>សូមបញ្ចូលលេខកូដផលិតផល</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={style.textInput}
            onChangeText={(code) => this.setState({ code })}
            onSubmitEditing={() => this.onSubmitHandler()}
            value={this.state.text}
            autoFocus
          />
        </View>
        <Button
          style={baseStyle.buttonInputCodeStyle}
          textStyle={baseStyle.buttonInputCodeTextStyle}
          onPress={() => this.onSubmitHandler()}>
          ស្វែងរក
        </Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  text: {
    fontSize: 26,
    marginBottom: 40,
  },
  textInput: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 24,
    borderWidth: 1,
    height: 60,
  },
});
