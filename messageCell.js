import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class MessageCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let name = this.props
        return(
            <View style = {styles.container}>
                <TouchableOpacity
                    onPress = {() => console.log('item pressed')}
                    style = {styles.touchable}>
                    <View style = {styles.touchableInside}>
                        <Text> {name} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkGreen,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    touchable: {
        backgroundColor: lightPink, 
        alignItems: 'center', 
        justifyContent: 'center',
        height: 250,
    },
    touchableInside: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: brown, 
        borderRadius: 10, 
        overflow: 'hidden'
    },
})