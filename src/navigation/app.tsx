import { AppScreens } from '@/interfaces/common';
import { AppStackParamList } from '@/interfaces/navigation';
import HomeScreen from '@/screens/app/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
