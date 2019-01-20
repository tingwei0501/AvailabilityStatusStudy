import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import ButtonSample from './buttonSample'
import NetUtil from './netUtil'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {id:'', password:'', email:'', group:''}
    }
    handleId  = (id) => {
        this.setState({ id: id })
    }
    handlePwd = (pwd) => {
        console.log(pwd)
        this.setState({ password: pwd })
    }
    _onPressButton = () => {
        id = this.state.id
        password = this.state.password
        if (id != '' && password != '') {
            let url = 'http://13.59.255.194:5000/signIn'
            let data = {'id': this.state.id, 'password': this.state.password}
            NetUtil.postJson(url, data, (response) => {
                alert(response)
            })
        } else {
            alert('每格都必須填寫!')
        }
        
        // fetch(url, {
        //     method: 'POST', 
        //     body: JSON.stringify(data),
        //     headers:{
        //       'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log(response.json());
             
        // }).catch((err) => {
        //     console.log('錯誤:', err);
        // });
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
    }
})