import { LatLng } from 'react-native-maps';
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

export const calculateCenterPoint = (coordinates: LatLng[]) => {
  const x = coordinates.map((c) => c.latitude);
  const y = coordinates.map((c) => c.longitude);

  const minX = Math.min.apply(null, x);
  const maxX = Math.max.apply(null, x);

  const minY = Math.min.apply(null, y);
  const maxY = Math.max.apply(null, y);

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2,
    latitudeDelta: (maxX - minX) * 1.2,
    longitudeDelta: (maxY - minY) * 1.2,
  };
};
