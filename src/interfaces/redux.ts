import { ISavedRegion } from './common';

export interface IAppState {
  isLoggedIn: boolean;
}

export interface ISavedRegionState {
  savedRegions: ISavedRegion[];
}
