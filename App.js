import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './Components/auth/Landing'
import RegisterScreen from './Components/auth/Register'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import MainScreen from './Components/Main'
import AddScreen from  './Components/Main/Add'
import SaveScreen from './Components/Main/Save'

const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBg4-voFWeN9eqQoWr_EBNkDS1kW9BJ4z8",
  authDomain: "instagram-dev-a48e6.firebaseapp.com",
  projectId: "instagram-dev-a48e6",
  storageBucket: "instagram-dev-a48e6.appspot.com",
  messagingSenderId: "884406086265",
  appId: "1:884406086265:web:ea6fa51e670b678bc402a8",
  measurementId: "G-XFHVX921KQ"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)

}

const Stack = createStackNavigator() 

export default function App({navigation}) {  

  const [state, setState] = useState({
    loaded: false,
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setState(prev => {
          return {
            ...prev,
            loggedIn: false,
            loaded: true
          }
        })
      } else {
        setState(prev => {
          return {
            ...prev,
            loggedIn: true,
            loaded: true
          }
        })
      }
    })
  }, [])

  if (!state.loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>
          Loading
        </Text>
      </View>
    )
  }

  if (!state.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='Add' component={AddScreen} navigation={navigation}/>
          <Stack.Screen name='Save' component={SaveScreen} navigation={navigation}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


