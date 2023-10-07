import { LatLng } from 'react-native-maps';

export enum AuthScreens {
  Login = 'Login',
}

export enum AppScreens {
  Home = 'Home',
  SavedRegions = 'SavedRegions',
  CreateRegion = 'CreateRegion',
  ViewRegion = 'ViewRegion',
}

export interface ISavedRegion {
  name: string;
  region: LatLng[];
  area: number;
  id: string;
}
