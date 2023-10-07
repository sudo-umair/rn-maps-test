import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, AppStackParamList } from './navigation';
import { AuthScreens, AppScreens } from './common';

// auth screens
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.Login
>;

// app screens
export type HomeScreenProps = NativeStackScreenProps<
  AppStackParamList,
  AppScreens.Home
>;
