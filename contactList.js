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
    Image,
    ActivityIndicator,
} from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import PageControl from 'react-native-page-control'
import Carousel from 'react-native-snap-carousel'
import Realm from 'realm'

import NetUtil from './netUtil'
import ButtonSample from './buttonSample'
import MyCheckBox from './myCheckBox'

const { width } = Dimensions.get("window")

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

// Define your models and their properties
const UserSchema = {
    name: 'User',
    properties: {
      name:  'string',
      image: 'data?',
    }
}

// let realm = new Realm({schema: [UserSchema,]})

export default class ContactListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            data: [],
            loaded: false,
            modalVisible: false,
            Q1ModalVisible: true,
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
    componentWillMount() {
        // const { navigation } = this.props
        // const id = navigation.getParam('id', 'no-id')
        // this.fetchData(id)
        // console.log('id: '+this.state.id)
        // if (this.state.id=='') {
        //     this.props.navigation.navigate('Home')
        // }
        console.log('in contactList')
        this.fetchData()
        
    }
    _storeToLocal() {
        // const iterator = userData.values()
        // let allUser = realm.objects('User')
        // realm.delete(allUser)
        // for (const value of iterator) {
        //     // console.log(value['id']) // expected output: "a" "b" "c"
        //     realm.write(() => {
        //         realm.create('User', {
        //             name: value['id'],
        //             image: value['img'],
        //         });
        //     })
        // }
        
    }
    componentDidMount() {
        // let users = realm.objects('User')
        // console.log(users)
        // for (let p of users) {
        //     console.log(`${p.name}`)
        // }
        // const { navigation } = this.props
        // let id = navigation.getParam('id', 'no-id')
        // console.log('in contactList')
        // this.fetchData()
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
    fetchData = () => {
        const { navigation } = this.props
        let id = navigation.getParam('id', 'no-id')
        let url = 'http://13.59.255.194:5000/getList'
        let data = {'id': id}
        NetUtil.postJson(url, data, (response) => {
            if (response.response == 'success') {
                /* successfully get list */
                this.setState({
                    data: this.state.data.concat(response.list),
                    loaded: true,
                    id: id,
                })
                // this._storeToLocal()
            } else {
                alert("錯誤")
            }
        })
    }
    _renderItem({item}) {
        let img = item.img
        let id = item.id
        return(
            <View style = {styles.touchable}>
                {/* <TouchableOpacity
                    onPress = {() => console.log('item pressed')}
                    style = {styles.touchable}>
                    <View style = {{width: vh(11), height: vh(11),}}>
                        <Image
                            style = {styles.image}
                            source = {{uri: 'data:image/png;base64, ' + img}}
                        />
                    </View>
                    <Text style = {styles.name}> {id} </Text>
                </TouchableOpacity> */}
                <View style = {{width: vh(11), height: vh(11),}}>
                    <Image
                        style = {styles.image}
                        source = {{uri: 'data:image/png;base64, ' + img}}
                    />
                </View>
                <Text style = {styles.name}> {id} </Text>
            </View>
        )
    }
    _renderLoadingView() {
        return(
            <View style = {styles.container}>
                <ActivityIndicator size = "large" color = "white" />
            </View>
        )
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    setQ1modalVisible(visible) {
        this.setState({ Q1ModalVisible: visible })
    }
    _onPressButton = (e) => {
        this.setModalVisible(!this.state.modalVisible)
    }
    _onPressEditButton = (e) => {
        console.log('press edit btn')
        this.props.navigation.navigate('EditProfile')
    }
    isFirstPage() {
        return this.state.currentPage==0
    }
    isLastPage(item) {
        return this.state.currentPage==item.length - 1
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
                    onPress = {() => {
                        if (this.state.Q1ModalVisible) {
                            if (this.state.pickerValue=='other' && this.state.usingPurpose=='other') {
                                Alert.alert(
                                    '錯誤',
                                    '請填寫其他原因',
                                    [
                                        {text: '確定', onPress: () => console.log('NO Pressed')},
                                    ]
                                )
                            } 
                            else {
                                this.setQ1modalVisible(!this.state.Q1ModalVisible)
                            }
                        } else if (this.state.modalVisible) {
                            if (this.state.noSendReasonOther && this.state.noSendReasonOtherText=='') {
                                Alert.alert(
                                    '錯誤',
                                    '請填寫其他原因',
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
            return this._renderLoadingView();
        }
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
                <MyCheckBox
                    containerStyle = {{marginRight: width/100}}
                    title = '怕打擾到他'
                    checked = {this.state.noSendReasonBother}
                    onPress = {() => this.setState({noSendReasonBother: !this.state.noSendReasonBother})}
                />
                <MyCheckBox
                    title = '覺得他在忙'
                    checked = {this.state.noSendReasonBusy}
                    onPress = {() => this.setState({noSendReasonBusy: !this.state.noSendReasonBusy})}
                />
            </View>
            <View style = {{flexDirection: 'row'}}>
                <MyCheckBox
                    containerStyle = {{marginTop: 0, marginRight: width/100}}
                    title = '狀態顯示回覆率低'
                    checked = {this.state.noSendReasonLow}
                    onPress = {() => this.setState({noSendReasonLow: !this.state.noSendReasonLow})}
                />
                <MyCheckBox
                    containerStyle = {{marginTop: 0}}
                    title = '其他'
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

        // let stepComponents = [Q1, Q2, Q3]
        let stepComponents = [Q2, Q3]
        return(
            <View style = {styles.container}>
                {/* For Q1 */}
                <Modal
                    animationType = 'fade'
                    visible = {this.state.Q1ModalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        this.setQ1modalVisible(false)
                    }}>
                    <View>
                        <View style = {styles.Q1Modal}>
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
                            <View style = {{marginTop: 10,}}>
                                {
                                    this._renderSubmitButton()
                                }
                            </View>
                        </View>                        
                    </View>
                </Modal>
                {/* For Q2-Q3 */}
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
                                    this.isLastPage(stepComponents)
                                    ? this._renderSubmitButton()
                                    : this._renderNextButton()
                                }
                            </View>
                        </View>                        
                    </View>
                </Modal>
                <View style = {{flexDirection: 'row', height: vh(11), alignItems: 'center', justifyContent:'space-around'}}> 
                    <Text style = {styles.userText}> 你目前的回覆率 </Text>
                    <View style = {{width: vw(35)}}>
                        <Text style = {{fontSize: 20, marginLeft: 3, color: lightPink}}> 55% </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style = {{ backgroundColor: lightGreen,
                            paddingLeft: 12,
                            paddingRight: 12,
                            width: 60,
                            borderRadius: 6,}}
                            onPress = {e => this._onPressEditButton(e)}>
                            <Text style = {{fontSize: 16, color: 'white',}}>編輯{'\n'}狀態</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data = {this.state.data}
                    renderItem = {this._renderItem}
                    keyExtractor = {item => item.id}
                    style = {styles.list}/>
                <ButtonSample 
                    title = "問卷"
                    // onPress = {this._onPressButton.bind(this)}
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
    Q1Modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        width: vw(80),
        height: vh(30),
        marginTop: vh(20),
        marginLeft: vw(10),
        flex: 0,
    },
    questionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userText: {
        color: lightPink,
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        paddingTop: 5,
    },
    image: {
        marginLeft: 10,
        width: vh(9),
        height: vh(11),
        resizeMode: 'cover',
    },
    touchable: {
        width: vw(100),
        flexDirection: 'row',
        flex: 1,  
        alignItems: 'center',
        backgroundColor: lightPink, 
        overflow: 'hidden',
        margin: 0.5,
    },
    // touchableInside: {
    //     flexDirection: 'row',
    //     flex: 1,  
    //     alignItems: 'center',
    //     backgroundColor: lightPink, 
    //     overflow: 'hidden',
    //     margin: 0.5,
    // },
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
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
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