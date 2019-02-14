import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Picker,
    Modal,
    Dimensions,
    Switch,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import PageControl from 'react-native-page-control'
import Carousel from 'react-native-snap-carousel'
// import { TextInput } from 'react-native-gesture-handler'

import NetUtil from './netUtil'
import ButtonSample from './buttonSample'

const { width } = Dimensions.get("window")

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
            modalVisible: false,
            usingPurpose: '',
            isSending: false,
            currentPage: 0,
            switchValue: false,
            switchText: '沒有',
        }
        this.fetchData = this.fetchData.bind(this)
    }
    _updateUsingPurpose = (p) => {
        this.setState({ usingPurpose: p })
    }
    _updateIsSending = (s) => {
        console.log(s)
        this.setState({ switchValue:s,
                        switchText: s? '有': '沒有' })
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
    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }
    _onPressButton = (e) => {
        this.setModalVisible(!this.state.modalVisible)
    }
    _renderTextInput() {
        return (
            <View>
                <TextInput 
                    placeholder = '其他原因'
                    placeholderTextColor = {brown}
                    selectionColor = {darkGreen}
                    underlineColorAndroid = {lightPink}
                    style = {styles.input}/>
            </View>
        )
    }
    _changeIndex = (index) => {
        this.setState({ currentPage: index })
    }
    _onSelect = ( item ) => {
        console.log(item);
    }
    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }
        let Q1 = 
        <View style = {styles.questionContainer}>
            <Text style = {styles.subTitle}>1. 請問您使用此App的目的是?</Text>
            <Picker
                selectedValue = {this.state.usingPurpose}
                onValueChange = {this._updateUsingPurpose}
                style = {styles.purposePicker}>
                    <Picker.Item label = "要和對方溝通" value = "contact" />
                    <Picker.Item label = "純粹好奇對方狀態" value = "curious" />
                    <Picker.Item label = "無聊打發時間" value = "boring" />
                    <Picker.Item label = "其他" value = "other" />
            </Picker>
            <View>
                {
                    this.state.usingPurpose == 'other'
                    ? this._renderTextInput()
                    : <View/>
                }
            </View>
        </View>
        let Q2 = 
        <View style = {styles.questionContainer}>
            <Text style = {styles.subTitle}>2. 請問您看完對方狀態之後，{'\n'}有傳訊息給他嗎?</Text>
            <View style = {{flexDirection: 'row', marginTop: 10,}}>
                <Text>{this.state.switchText}</Text>
                <Switch
                    thumbColor = {lightPink}
                    value = {this.state.switchValue}
                    onValueChange = {this._updateIsSending}/>
            </View>
        </View>
        let Q3 = 
        <View style = {styles.questionContainer}>
            <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>關閉問卷</Text>
            </TouchableHighlight>
        </View>
        let stepComponents = [Q1, Q2, Q3]
        return(
            <View style = {styles.container}>
                <Modal
                    animationType = 'fade'
                    visible = {this.state.modalVisible}
                    transparent = {true}
                    onRequestClose={() => {
                        alert('modal closed.')
                        this.setModalVisible(false)
                    }}>
                    <View style = {styles.modalContainer}>
                        <View style = {styles.modal}>
                            <Text style = {styles.title}>問卷</Text>
                            <View>
                                <Carousel
                                    ref = {(c) => { this._carousel = c; }}
                                    data = {stepComponents}
                                    renderItem = {({ item }) => item}
                                    sliderWidth = {width/1.2}
                                    itemWidth = {width/1.2}
                                    onSnapToItem = {this._changeIndex}
                                />
                                <PageControl  
                                    numberOfPages = {stepComponents.length}
                                    currentPage = {this.state.currentPage}
                                    hidesForSinglePage
                                    pageIndicatorTintColor = {greyPink}
                                    currentPageIndicatorTintColor = 'white'
                                    indicatorStyle = {{borderRadius: 5}}
                                    currentIndicatorStyle = {{borderRadius: 5}}
                                    indicatorSize = {{width:8, height:8}}
                                    onPageIndicatorPress = {this.onItemTap} />
                            </View>
                        </View>                        
                    </View>
                </Modal>
                <FlatList
                    data = {this.state.data}
                    renderItem = {this.renderItem}
                    keyExtractor = {item => item.id}
                    style = {styles.list}/>
                <ButtonSample 
                    title = "問卷"
                    onPress = {this._onPressButton.bind(this)}
                    onPress = {e => this._onPressButton(e)}/>
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
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: 'flex-start',
        borderRadius: 15,
        width: vw(80),
        height: vh(50),
        marginTop: vh(20),
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
        overflow: 'hidden',
        margin: 0.5,
    },
    purposePicker: {
        marginLeft: 10,
        width: vw(50),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subTitle: {
        marginTop: 20,
    },
    input: {
        width: vw(45),
    },
    questionContainer: {
        alignItems: 'center',
    },
    checkBox: {
        padding: 10,
        // flex:1, 
    },
})