import React, { Component } from 'react';

import List from './list';
import Input from './input';
import ScrollViewExample from './scroll.view';
import HttpExample from './http.example';
import Animations from './animations';
import { Router } from 'react-native-router-flux'
import Routes from './routes'
import PickerExample from './picker.example';
import SwitchExample from './switch';

export default class TutorialPoint extends Component {
  render() {
    return (
      // <SwitchExample />
      <PickerExample />
      // <Routes />
      // <Animations />
      // <HttpExample />
      // <ScrollViewExample />
      // <Input />
      // <List />
    );
  }
}