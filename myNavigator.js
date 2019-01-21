import { createAppContainer, createStackNavigator } from 'react-navigation'
import SignUpScreen from './signUp'
import SignInScreen from './signIn'
import ContactListScreen from './contactList'
import HomeScreen from './home'

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
            headerTransparent: true,
        })
    },
  },
    {
      initialRouteName: 'Home',
    }
)
const AppContainer = createAppContainer(RootStack);
export default AppContainer