import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from './Home';
import Login from './Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} options={{
          title: 'Sign In or Sign Up'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


