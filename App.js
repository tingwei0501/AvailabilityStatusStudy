import React, {Component} from 'react'
import {
  AppRegistry,
} from 'react-native'

import AppStackNav from './myNavigator'

export default class App extends Component {
  render() {
    return <AppStackNav />
  }
}

AppRegistry.registerComponent('AwesomeProject', () => App)
