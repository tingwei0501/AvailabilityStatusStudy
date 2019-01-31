import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import NetUtil from './netUtil'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

export default class ContactListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loaded: false,
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'no-id')
        this.fetchData(id)
    }
    fetchData = (id) => {
        console.log(id+ ' requestData')
        let url = 'http://13.59.255.194:5000/getList'
        let data = {'id': id}
        NetUtil.postJson(url, data, (response) => {
            if (response.response == 'success') {
                /* successfully get list */
                this.setState({
                    data: this.state.data.concat(response.list),
                    loaded: true
                })
            } else {
                alert("錯誤")
            }
        })
    }
    renderItem({item}) {
        return(
            <View style = {styles.container}>
                <TouchableOpacity
                    onPress = {() => console.log('item pressed')}
                    style = {styles.touchable}>
                    <View style = {styles.touchableInside}>
                        <Text> {item.id} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    renderLoadingView() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.loadingText}>Loading...</Text>
            </View>
        )
    }
    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }
        return(
            <View style = {styles.container}>
                <FlatList
                    data = {this.state.data}
                    renderItem = {this.renderItem}
                    keyExtractor = {item => item.id}
                    style = {styles.list}/>
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
    loadingText: {
        color: lightPink,
        fontSize: 30,
        fontWeight: 'bold',
    },
    list: {
        paddingTop: 5,
    },
    touchable: {
        height: 70,
        width: vw(100),
    },
    touchableInside: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: lightPink, 
        // borderRadius: 10, 
        overflow: 'hidden',
        margin: 0.5,
    },
})