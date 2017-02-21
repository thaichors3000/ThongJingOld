import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Text style={{ fontSize: 18, flex: 1, textAlign: 'right', paddingRight: 10, color: '#000' }}>
          {this.props.name}
        </Text>
        <Text style={{ fontSize: 18, color: '#000' }}>:</Text>
        <Text style={{ fontSize: 18, flex: 1, textAlign: 'left', paddingLeft: 10, color: '#000' }}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}
