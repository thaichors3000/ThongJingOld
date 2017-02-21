import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import base from './../styles/base';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[base.centering]}>
        <ActivityIndicator
          animating={true}
          style={{ padding: 8, height: 80 }}
          size="large"
        />
      </View>
    );
  }
}
