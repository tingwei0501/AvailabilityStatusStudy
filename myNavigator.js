import { createAppContainer, createStackNavigator } from 'react-navigation'
import SignUpScreen from './signUp'
import SignInScreen from './signIn'
import ContactListScreen from './contactList'
import HomeScreen from './home'

const darkGreen = '#657359'
const lightGreen = '#9AA582'
const brown = '#8B775F'
const greyPink = '#D7C9BE'
const lightPink = '#F1E4DB'

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            headerTransparent: true,
        }),
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: () => ({
            headerTransparent: true,
            headerLeft: null,
        }),
    },
    SignIn: {
        screen: SignInScreen,
        navigationOptions: () => ({
            headerTransparent: true,
            headerLeft: null,
        })
    },
    ContactList: {
        screen: ContactListScreen,
        navigationOptions: () => ({
            headerLeft: null,
            title: '聯絡人列表',
            headerTintColor: darkGreen,
            headerStyle: {
                backgroundColor: lightGreen
            },
            // headerTransparent: true,
        })
    },
  },
    {
      initialRouteName: 'Home',
    }
)
const AppContainer = createAppContainer(RootStack);
export default AppContainer