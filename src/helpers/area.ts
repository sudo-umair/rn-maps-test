import { LatLng } from 'react-native-maps';
// import turf, { Position } from '@turf/turf';
import { getAreaOfPolygon } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';

const transformCoordinates = (
  coordinates: LatLng[]
): GeolibInputCoordinates[] => {
  return coordinates.map((coordinate) => [
    coordinate.longitude,
    coordinate.latitude,
  ]);
};

export const calculateArea = (coordinates: LatLng[]): number => {
  const closedPolygon = [...coordinates, coordinates[0]];
  const newPolygonData = transformCoordinates(closedPolygon);
  const areaSqMeter = getAreaOfPolygon(newPolygonData);
  const areaSqFeet = areaSqMeter * 10.7639;
  return Number(areaSqFeet.toFixed(2));
};
