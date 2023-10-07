import { AuthScreens } from '@/interfaces/common';
import { AuthStackParamList } from '@/interfaces/navigation';
import LoginScreen from '@/screens/auth/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthScreens.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
