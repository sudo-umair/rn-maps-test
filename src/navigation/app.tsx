import { AppScreens } from '@/interfaces/common';
import { AppStackParamList } from '@/interfaces/navigation';
import CreateRegionScreen from '@/screens/app/create-region';
import HomeScreen from '@/screens/app/home';
import SavedRegionsScreen from '@/screens/app/saved-regions';
import ViewRegionScreen from '@/screens/app/view-region';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
      <Stack.Screen
        name={AppScreens.SavedRegions}
        component={SavedRegionsScreen}
      />
      <Stack.Screen
        name={AppScreens.CreateRegion}
        component={CreateRegionScreen}
      />
      <Stack.Screen name={AppScreens.ViewRegion} component={ViewRegionScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
