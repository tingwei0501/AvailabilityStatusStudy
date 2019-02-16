import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'

import ButtonSample from './buttonSample'
import NetUtil from './netUtil'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class SignInScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '', 
            password: '', 
            email: '', 
            group: ''
        }
    }
    handleId  = (id) => {
        this.setState({ id: id })
    }
    handlePwd = (pwd) => {
        console.log(pwd)
        this.setState({ password: pwd })
    }
    _onPressButton = (e) => {
        id = this.state.id
        password = this.state.password
        if (id != '' && password != '') {
            let url = 'http://13.59.255.194:5000/signIn'
            let data = {'id': this.state.id, 'password': this.state.password}
            NetUtil.postJson(url, data, (response) => {
                if (response.response == 'no user') {
                    Alert.alert(
                        '登入失敗',
                        '此帳號不存在，請先註冊',
                        [
                          {text: '確定', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                        ]
                    )
                    this.props.navigation.navigate('SignUp')
                } else if (response.response == 'failed') {
                    Alert.alert(
                        '登入失敗',
                        '密碼錯誤',
                        [
                          {text: '確定', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                        ]
                    )
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        '登入成功',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        5,
                        100,
                    )
                    this.props.navigation.navigate('ContactList', {
                        id: id,
                    })
                }
            })
        } else {
            Alert.alert(
                '登入失敗',
                '每格都必須填寫!',
                [
                  {text: '確定', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                ]
            )
        }
    }
    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.upper}>
                    <Text style = {styles.title}> 請登入 </Text>
                    <View style = {styles.inputContainer}>
                        <Text style = {styles.subtitle}> 帳號 </Text>
                        <TextInput
                            placeholder = '請輸入ID'
                            placeholderTextColor = 'white'
                            selectionColor = 'white'
                            underlineColorAndroid = {lightPink}
                            style = {styles.input}
                            onChangeText = {this.handleId}
                        />
                    </View>
                    <View style = {styles.inputContainer}>
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
                </View>
                <View style={styles.lower}>
                    <ButtonSample 
                        title = "登入"
                        onPress = {this._onPressButton.bind(this)}
                        onPress = {e => this._onPressButton(e)}/>
                        
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
    title: {
        color: lightPink,
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: lightPink,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: vh(7),
        width: vw(50),
        fontSize: 20,
        marginLeft: 3,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 15,
    },
})
