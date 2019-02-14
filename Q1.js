import React, {Component} from 'react'
import { 
    Modal, 
    Text, 
    View,
    StyleSheet,
    TouchableHighlight,

} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import PageControl from 'react-native-page-control'

export default class Q1 extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View >
                <Text style = {styles.subTitle}>1. 請問您使用此App的目的是?</Text>
                <Picker
                    selectedValue = {this.state.usingPurpose}
                    onValueChange = {this._updateUsingPurpose}>
                        <Picker.Item label = "要和對方溝通" value = "contact" />
                        <Picker.Item label = "純粹好奇對方狀態" value = "curious" />
                        <Picker.Item label = "無聊打發時間" value = "boring" />
                        <Picker.Item label = "其他" value = "other" />
                </Picker>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    modalContainer: {
        paddingBottom: 10,
        marginTop: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        marginTop: 17,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 15,
        width: vw(80),
        height: vh(70),
    },
    subTitle: {
        marginTop: 3,
        marginLeft: 5,
    },
})