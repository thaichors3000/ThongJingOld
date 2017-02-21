import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProductCode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, fontSize: 20, paddingTop: 4, textAlign: 'right' }}>{this.props.name}</Text>
        <Text style={{ fontSize: 20, paddingTop: 6, paddingLeft: 10, paddingRight: 10 }}>:</Text>
        <Text style={{ flex: 1, fontSize: 24, paddingTop: 6 }}>{this.props.value}</Text>
      </View>
    );
  }
}
