import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { vw, vh } from 'react-native-expo-viewport-units'

import ButtonSample from './buttonSample'
import NetUtil from './netUtil'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '', 
            password: '', 
            email: '', 
            group: ''
        }
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
    _onPressButton = (e) => {
        id = this.state.id
        password = this.state.password
        email = this.state.email
        group = this.state.group
        if (id != '' && password != '' && email != '' && group != '') {
            let url = 'http://13.59.255.194:5000/signUp'
            let data = {'id': this.state.id, 'password': this.state.password,
                        'email': this.state.email, 'group': this.state.group}
            NetUtil.postJson(url, data, (response) => {
                if (response['response'] == 'failed') {
                    /* id already exist */
                    alert(id+" 已存在，請註冊新帳號")
                } else {
                    alert(id+" 註冊成功")
                    this.props.navigation.navigate('SignIn')
                }
            })
        } else {
            alert('每格都必須填寫!!')
        }
    }
    _onPressIdCheck = (e) => {
        let url = 'http://13.59.255.194:5000/idCheck'
        let data = {'id': this.state.id}
        if (this.state.id != '') {
            NetUtil.postJson(url, data, (response) => {
                alert(response.response)
            })
        } else {
            alert("請輸入帳號")
        }
    }
    render() {
        return(
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
                            onPress = {this._onPressIdCheck.bind(this)}
                            onPress = {e=>this._onPressIdCheck(e)}>
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
                        onPress = {this._onPressButton.bind(this)}
                        onPress = {e=>this._onPressButton(e)}/>
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