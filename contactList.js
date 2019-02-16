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
    Alert,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import PageControl from 'react-native-page-control'
import Carousel from 'react-native-snap-carousel'
import { CheckBox } from 'react-native-elements'

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
            currentPage: 0,
            /***  Questionnaire 1 */
            pickerValue: '',
            usingPurpose: '',
            /***  Questionnaire 2 */
            switchValue: false,
            switchText: '沒有',
            /***  Questionnaire 3-1: switchValue = true */
            msgPurpose: '',
            /***  Questionnaire 3-2: switchValue = false */
            noSendReasonBother: false,
            noSendReasonBusy: false,
            noSendReasonLow: false, 
            noSendReasonOther: false,
            noSendReasonOtherText: '',
        }
        this.fetchData = this.fetchData.bind(this)
    }
    _updatePickerValue = (p) => {
        console.log(p)
        this.setState({ pickerValue: p, usingPurpose: p })
    }
    handlePurposeOther = (p) => {
        console.log(p)
        this.setState({ usingPurpose: p })
    }
    _updateIsSending = (s) => {
        console.log(s)
        this.setState({ switchValue:s,
                        switchText: s? '有': '沒有' })
    }
    _updateMsgPurpose = (m) => {
        this.setState({ msgPurpose: m })
    }
    _updateNoSendReason = (r) => {
        this.setState({ noSendReason: r })
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
        // this.setState({ currentPage: 0 })
        // console.log(this.state.currentPage)
        // this._carousel.snapToItem(this.state.currentPage)
    }
    isFirstPage() {
        return this.state.currentPage==0
    }
    isLastPage() {
        return this.state.currentPage==2
    }
    _renderUsingPurposeTextInput() {
        return (
            <View>
                <TextInput 
                    placeholder = '其他原因'
                    placeholderTextColor = {brown}
                    selectionColor = {darkGreen}
                    underlineColorAndroid = {lightPink}
                    style = {styles.input}
                    onChangeText = {(p)=> {
                        console.log(p)
                        this.setState({ usingPurpose: p})
                    }}/>
            </View>
        )
    }
    _renderNoSendTextInput() {
        return (
            <View>
                <TextInput 
                    placeholder = '其他原因'
                    placeholderTextColor = {brown}
                    selectionColor = {darkGreen}
                    underlineColorAndroid = {lightPink}
                    style = {styles.input}
                    onChangeText = {(p)=> {
                        console.log(p)
                        this.setState({ noSendReasonOtherText: p})
                    }}/>
            </View>
        )
    }
    _renderBackButton() {
        const nextIndex = this.state.currentPage - 1
        return (
            <View>
                <TouchableOpacity
                    style = {styles.questionnaireButton}
                    onPress = {() => {
                        this.setState({currentPage: nextIndex})
                        this._carousel.snapToItem(nextIndex)
                    }}>
                    <Text style = {styles.questionnaireBackButtonText}>上一頁</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderNextButton() {
        const nextIndex = this.state.currentPage + 1
        return (
            <View>
                <TouchableOpacity
                    style = {styles.questionnaireButton}
                    onPress = {() => {
                        this.setState({currentPage: nextIndex})
                        this._carousel.snapToItem(nextIndex)
                    }}>
                    <Text style = {styles.questionnaireNextButtonText}>下一頁</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderSubmitButton() {
        return (
            <View>
                <TouchableOpacity
                    style = {styles.questionnaireButton}
                    onPress = {() => {
                        // console.log("here"+this.state.usingPurpose)
                        if (this.state.noSendReasonOther && this.state.noSendReasonOtherText=='') {
                            Alert.alert(
                                '錯誤',
                                '請填寫第三題的其他原因',
                                [
                                  {text: '確定', onPress: () => console.log('NO Pressed')},
                                ]
                            )
                        } else if (this.state.pickerValue=='other' && this.state.usingPurpose=='other'){
                            Alert.alert(
                                '錯誤',
                                '請填寫第一題的其他原因',
                                [
                                  {text: '確定', onPress: () => console.log('NO Pressed')},
                                ]
                            )
                        } else {
                            Alert.alert(
                                '提交成功',
                                '感謝您填寫問卷!',
                                [
                                  {text: 'OK', onPress: () => console.log('NO Pressed')},
                                ]
                            )
                            this.setModalVisible(!this.state.modalVisible)
                            this.setState({ currentPage: 0 })
                            this._carousel.snapToItem(this.state.currentPage)
                        }
                    }}>
                    <Text style = {styles.questionnaireNextButtonText}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _changeIndex = (index) => {
        this.setState({ currentPage: index })
    }

    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }
        let Q1 = 
        <View style = {styles.questionContainer}>
            <Text style = {styles.subTitle}>1. 請問您使用此App的目的是?</Text>
            <Picker
                selectedValue = {this.state.pickerValue}
                onValueChange = {this._updatePickerValue}
                style = {styles.purposePicker}>
                    <Picker.Item label = "要和對方溝通" value = "contact" />
                    <Picker.Item label = "純粹好奇對方狀態" value = "curious" />
                    <Picker.Item label = "無聊打發時間" value = "boring" />
                    <Picker.Item label = "其他" value = "other" />
            </Picker>
            <View>
                {
                    this.state.pickerValue == 'other'
                    ? this._renderUsingPurposeTextInput()
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
            <Text style = {styles.subTitle}>3. 請問您沒有傳訊息給對方的原因是?</Text>
            <View style = {{flexDirection: 'row'}}>
                <CheckBox
                    size = {15}
                    checkedColor = {brown}
                    containerStyle = {{marginRight: width/100}}
                    title ='怕打擾到他'
                    checked = {this.state.noSendReasonBother}
                    onPress = {() => this.setState({noSendReasonBother: !this.state.noSendReasonBother})}
                />
                <CheckBox
                    size = {15}
                    checkedColor = {brown}
                    title ='覺得他在忙'
                    checked = {this.state.noSendReasonBusy}
                    onPress = {() => this.setState({noSendReasonBusy: !this.state.noSendReasonBusy})}
                />
            </View>
            <View style = {{flexDirection: 'row'}}>
                <CheckBox
                    size = {15}
                    checkedColor = {brown}
                    containerStyle = {{marginTop: 0, marginRight: width/100}}
                    title ='狀態顯示回覆率低'
                    checked = {this.state.noSendReasonLow}
                    onPress = {() => this.setState({noSendReasonLow: !this.state.noSendReasonLow})}
                />
                <CheckBox
                    size = {15}
                    checkedColor = {brown}
                    containerStyle = {{marginTop: 0}}
                    title ='其他'
                    checked = {this.state.noSendReasonOther}
                    onPress = {() => this.setState({noSendReasonOther: !this.state.noSendReasonOther})}
                />
            </View>
            <View>
                {
                    this.state.noSendReasonOther
                    ? this._renderNoSendTextInput()
                    : <View/>
                }
            </View>
        </View>
        /* if sending the msg */
        if(this.state.switchValue) {
            Q3 = 
            <View style = {styles.questionContainer}>
                <Text style = {styles.subTitle}>3. 請問您當時傳訊息給對方的溝通目的是?</Text>
                <Picker
                    selectedValue = {this.state.msgPurpose}
                    onValueChange = {this._updateMsgPurpose}
                    style = {styles.purposePicker}>
                        <Picker.Item label = "短回應" value = "short" />
                        <Picker.Item label = "告知" value = "inform" />
                        <Picker.Item label = "長聊" value = "long" />
                </Picker>
            </View>
        } 

        let stepComponents = [Q1, Q2, Q3]
        return(
            <View style = {styles.container}>
                <Modal
                    animationType = 'fade'
                    visible = {this.state.modalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setModalVisible(false)
                    }}>
                    <View>
                        <View style = {styles.modal}>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {styles.title}>問卷</Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                        this.setState({ currentPage: 0 })
                                        this._carousel.snapToItem(this.state.currentPage)
                                    }}>
                                    <Text style = {{marginLeft: 30, marginTop: 10}}>關閉問卷</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{
                                backgroundColor: "white",
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                alignItems: "center",
                            }}>
                                <Carousel
                                    ref = {(c) => { this._carousel = c; }}
                                    data = {stepComponents}
                                    renderItem = {({ item }) => item}
                                    sliderWidth = {width/1.2}
                                    itemWidth = {width/1.2}
                                    onSnapToItem = {this._changeIndex}
                                />
                                <PageControl  
                                    style = {styles.pageControl}
                                    numberOfPages = {stepComponents.length}
                                    currentPage = {this.state.currentPage}
                                    hidesForSinglePage
                                    pageIndicatorTintColor = {greyPink}
                                    currentPageIndicatorTintColor = {darkGreen}
                                    indicatorStyle = {{borderRadius: 7}}
                                    currentIndicatorStyle = {{borderRadius: 5}}
                                    indicatorSize = {{width:8, height:8}}
                                    onPageIndicatorPress = {this.onItemTap} />
                            </View>
                            <View style = {styles.questionButtonContainer}>
                                {
                                    this.isFirstPage()
                                    ? <View/>
                                    : this._renderBackButton()
                                }
                                {
                                    this.isLastPage()
                                    ? this._renderSubmitButton()
                                    : this._renderNextButton()
                                }
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
    modal: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: vw(80),
        height: vh(60),
        marginTop: vh(15),
        marginLeft: vw(10),
        flex: 0,
    },
    questionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    pageControl: {
        marginTop: vh(18),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: vw(width/10.5),
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
    questionnaireBackButtonText: {
        fontSize: 14,
        marginLeft: vw(5),
    },
    questionnaireNextButtonText: {
        fontSize: 14,
        marginRight: vw(5),
    },
})