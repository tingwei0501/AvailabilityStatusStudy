import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default class buttonSample extends Component {

  render() {
    let {onPress, title} = this.props
    return (
      <View style = {styles.center}>
        <TouchableOpacity 
          style = {styles.button}
          onPress = {onPress}>
          <Text style = {styles.buttonText}> {title} </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    // margin: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#9AA582',
    borderRadius: 9,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})