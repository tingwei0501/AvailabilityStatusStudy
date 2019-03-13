import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
// import ButtonSample from './buttonSample'

export default class EditProfileScreen extends Component {
    constructor(props) {
      super(props)
    }
    // _onPressSignUp = (e) => {
    //     this.props.navigation.navigate('SignUp')
    // }
    // _onPressSignIn = (e) => {
    //     this.props.navigation.navigate('SignIn')
    // }
    render() {
        return (
            <View style={styles.container}>
            <Text> 編輯的頁面 </Text>
            {/* <View style = {styles.buttonContainer}>
                <ButtonSample 
                title="註冊"
                onPress = {this._onPressSignUp.bind(this)}
                onPress = {e=>this._onPressSignUp(e)}/>
            </View>
            <View style = {styles.buttonContainer}>
                <ButtonSample 
                title="登入"
                onPress = {this._onPressSignIn.bind(this)}
                onPress = {e=>this._onPressSignIn(e)}/>
            </View> */}
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
  