import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import ButtonSample from './buttonSample'

export default class HomeScreen extends Component {
    constructor(props) {
      super(props)
    }
    _onPressSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }
    _onPressSignIn = () => {
        this.props.navigation.navigate('SignIn')
    }
    render() {
        
        return (
            <View style={styles.container}>
            <View style = {styles.buttonContainer}>
                <ButtonSample 
                title="註冊"
                onPress = {this._onPressSignUp}/>
            </View>
            <View style = {styles.buttonContainer}>
                <ButtonSample 
                title="登入"
                onPress = {this._onPressSignIn}/>
            </View>
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
    buttonContainer: {
        margin: 20,
    }
})
  