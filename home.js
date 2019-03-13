import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
} from 'react-native'
import ButtonSample from './buttonSample'

const KEY = "@Route:initialPage"

export default class HomeScreen extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
        AsyncStorage.multiGet([KEY, 'loginId', 'loginPwd'])
        .then((data) => {
            token = data[0][1] || null
            if (token == 'alreadyLogin') {
              alert('已登入! 帳號是' + data[1][1])
              this.props.navigation.navigate('ContactList', {
                  id: data[1][1],
                  password: data[2][1],
              })
            } else {
                console.log('not yet')
            }
        })
    }
    _onPressSignUp = (e) => {
        this.props.navigation.navigate('SignUp')
    }
    _onPressSignIn = (e) => {
        this.props.navigation.navigate('SignIn')
    }
    render() {
        
        return (
            <View style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <ButtonSample 
                title = "註冊"
                onPress = {this._onPressSignUp.bind(this)}
                onPress = {e=>this._onPressSignUp(e)}/>
            </View>
            <View style = {styles.buttonContainer}>
                <ButtonSample 
                title="登入"
                onPress = {this._onPressSignIn.bind(this)}
                onPress = {e=>this._onPressSignIn(e)}/>
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
  