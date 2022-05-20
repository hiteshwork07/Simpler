import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Auth/Splash/Splash';
import Login from '../screens/Auth/Login/Login';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
      <Stack.Navigator 
        initialRouteName='Splash'
        screenOptions={{
            headerShown:false
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />

      </Stack.Navigator>
  );
}

export default AuthStack;