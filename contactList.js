import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class ContactListScreen extends Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text> Contact List </Text>
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
})