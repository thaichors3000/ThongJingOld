import React, { Component } from 'react';
import { Image } from 'react-native';
import Button from 'apsl-react-native-button';
import { Actions } from 'react-native-router-flux';

import base from './../styles/base';

export default class CloseButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={[base.iconButton]}
        onPress={() => Actions.homePage({ role: this.props.role })} >
        <Image
          style={{ height: 22, width: 22 }}
          source={require('./img/clear.png')} />
      </Button>
    );
  }
}
