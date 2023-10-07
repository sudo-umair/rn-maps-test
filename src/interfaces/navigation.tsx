import { AppScreens, AuthScreens } from './common';

export type AuthStackParamList = {
  [AuthScreens.Login]: undefined;
};

export type AppStackParamList = {
  [AppScreens.Home]: undefined;
};
