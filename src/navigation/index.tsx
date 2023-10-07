import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth';
import AppStack from './app';
import { useAppSelector } from '@/redux/store';

const AppNavigator = () => {
  const isLoggedIn = useAppSelector((state) => state.appState.isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
