import React, {Component} from 'react'
import { CheckBox } from 'react-native-elements'

const brown = '#8B775F'

export default class MyCheckBox extends Component {
    render() {
        let {containerStyle, title, checked, onPress} = this.props
        return (
            <CheckBox
                size = {15}
                checkedColor = {brown}
                containerStyle = {containerStyle}
                title = {title}
                checked = {checked}
                onPress = {onPress}
            />
        )
    }
}