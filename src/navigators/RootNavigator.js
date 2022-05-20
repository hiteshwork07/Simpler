import * as React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from './Drawer';
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      {user.IsUserLoggedIn ? <Drawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
