import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { vw, vh } from 'react-native-expo-viewport-units'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import ButtonSample from './buttonSample'
import SignIn from './signIn'
import NetUtil from './netUtil'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

class SignUpScreen extends Component {
    constructor(props){
      super(props)
      this.state = {id:'', password:'', email:'', group:''}
    }
    handleId = (id) => {
        console.log(id)
        this.setState({ id: id })
     }
    handlePwd = (pwd) => {
        console.log(pwd)
        this.setState({ password: pwd })
    }
    handleEmail = (email) => {
        console.log(email)
        this.setState({ email: email })
    }
    handleGroup = (group) => {
        console.log(group)
        this.setState({ group: group })
    }
    _onPressButton = () => {
        id = this.state.id
        password = this.state.password
        email = this.state.email
        group = this.state.group
        if (id != '' && password != '' && email != '' && group != '') {
            let url = 'http://13.59.255.194:5000/signUp'
            let data = {'id': this.state.id, 'password': this.state.password,
                        'email': this.state.email, 'group': this.state.group}
            NetUtil.postJson(url, data, (response) => {
                alert(response)
            })
            this.props.navigation.navigate('SignIn')
        } else {
            alert('每格都必須填寫!!')
        }
        
        // fetch(url, {
        //     method: 'POST', 
        //     body: JSON.stringify(data),
        //     headers:{
        //       'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log(this.state.id, "sing up successfully!");
             
        // }).catch((err) => {
        //     console.log('錯誤:', err);
        // });
    }
    _onPressIdCheck = () => {
        let url = 'http://13.59.255.194:5000/idCheck'
        let data = {'id': this.state.id}
        NetUtil.postJson(url, data, (response) => {
            alert(response)
        })
    }
    render () {
        return (
            <View style = {styles.container}>
                <View style = {styles.upper}>
                    <View style = {styles.unitView}>
                        <Text style = {styles.title}> 註冊 </Text>
                    </View>
                    <View style = {styles.unitView}>
                        <Text style = {styles.subtitle}> 帳號 </Text>
                        <TextInput
                            placeholder = '請輸入ID'
                            placeholderTextColor = 'white'
                            selectionColor = 'white'
                            underlineColorAndroid = {lightPink}
                            style = {styles.input}
                            onChangeText = {this.handleId}
                        />
                        <TouchableOpacity
                            style = {styles.idCheck}
                            onPress = {this._onPressIdCheck}>
                            <Text style = {styles.idCheckText}> 確認帳號 </Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style = {styles.unitView}>
                        <Text style = {styles.subtitle}> 密碼 </Text>
                        <TextInput
                            placeholder = '請輸入密碼'
                            placeholderTextColor = 'white'
                            selectionColor = 'white'
                            underlineColorAndroid = {lightPink}
                            secureTextEntry = {true}
                            style = {styles.input}
                            onChangeText = {this.handlePwd}
                        />
                    </View>
                    <View style = {styles.unitView}>
                        <Text style = {styles.subtitle}> 信箱 </Text>
                        <TextInput
                            placeholder = '請輸入信箱'
                            placeholderTextColor = 'white'
                            selectionColor = 'white'
                            underlineColorAndroid = {lightPink}
                            style = {styles.input}
                            onChangeText = {this.handleEmail}
                            keyboardType = "email-address"
                        />
                    </View>
                    <View style = {styles.unitView}>
                        <Text style = {styles.subtitle}> 組別 </Text>
                        <TextInput
                            placeholder = '請輸入組別'
                            placeholderTextColor = 'white'
                            selectionColor = 'white'
                            underlineColorAndroid = {lightPink}
                            style = {styles.input}
                            onChangeText = {this.handleGroup}
                        />
                    </View>
                </View>
                <View style={styles.lower}>
                    <ButtonSample 
                        title = "確認"
                        onPress = {this._onPressButton}/>
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
        backgroundColor: darkGreen,
    },
    upper: {
        flex:3,
        margin: 20,
    },
    lower: {
        flex: 1,
    },
    unitView: {
        flex: 1, 
        flexDirection: 'row',
        margin: 8,
    },
    title: {
        color: lightPink,
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: lightPink,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    input: {
        height: vh(7),
        width: vw(45),
        fontSize: 20,
        marginLeft: 3,
        color: 'white',
        
    },
    idCheck: {
        backgroundColor: lightGreen,
        height: vh(5),
        marginTop: 8,
        borderRadius: 6,
    },
    idCheckText: {
        fontSize: 18,
        color: darkGreen,
    }
})
const AppNavigator = createStackNavigator({
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: () => ({
            headerLeft: null,
            headerTransparent: true,
        }),
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: () => ({
            headerTransparent: true,
            headerLeft: null,
        }),
    },
  }
)
const AppContainer = createAppContainer(AppNavigator)
export default class SignUp extends Component {
  render() {
    return <AppContainer />
  }
}