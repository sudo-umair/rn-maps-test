import { AppScreens, AuthScreens, ISavedRegion } from './common';

export type AuthStackParamList = {
  [AuthScreens.Login]: undefined;
};

export type AppStackParamList = {
  [AppScreens.Home]: undefined;
  [AppScreens.SavedRegions]: undefined;
  [AppScreens.CreateRegion]: undefined;
  [AppScreens.ViewRegion]: { region: ISavedRegion };
};
