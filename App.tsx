import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import Settings from './src/pages/Settings';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {useState} from 'react';
import { Provider, useSelector } from "react-redux";
import store from "./src/store";
import { RootState } from './src/store/reducer';
import AppInner from './AppInner';




function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Provider store={store}>
      <AppInner />
    </Provider>

  );
}

export default App;
