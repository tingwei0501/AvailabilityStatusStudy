import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ButtonSample from './buttonSample'
import SignUp from './signUp'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }
  _onPressButton = () => {
    this.props.navigation.navigate('SignUp')
  }
  render() {
    return (
      <View style={styles.container}>
        <ButtonSample 
          title="註冊"
          onPress = {this._onPressButton}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#657359',
  },
})

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            headerTransparent: true,
        }),
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: () => ({
            headerTransparent: true,
            headerLeft: null,
        }),
    },
  },
    {
      initialRouteName: 'Home',
    }
)

const AppContainer = createAppContainer(AppNavigator)
export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

AppRegistry.registerComponent('AwesomeProject', () => App)
