import { createStackNavigator } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import BookIndex from './pages/book/index';
import BookAdd from './pages/book/add';

const Routes = createStackNavigator({
  SignIn,
  SignUp,
  Main,
  BookIndex,
  BookAdd
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#4682B4',
    },
    headerTitleStyle: {
      flex: 1,
      fontWeight:'500',
      fontSize:24,
      marginTop:5,
      textAlign: 'center',
    },
    headerTintColor: '#FFF',
  }
});

export default Routes;