import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigation';
import { AuthScreens } from './common';

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.Login
>;
