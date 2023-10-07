import { StyleSheet, View } from 'react-native';
import React, { Fragment, useLayoutEffect } from 'react';
import { ViewRegionScreenProps } from '@/interfaces/screens';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
  Region,
} from 'react-native-maps';
import { Octicons } from '@expo/vector-icons';
import Button from '@/components/ui/button';

const ViewRegionScreen: React.FC<ViewRegionScreenProps> = ({
  navigation,
  route,
}) => {
  const { region } = route.params;
  const { area, id, name, region: coordinates } = region;

  const selectedRegion: Region = {
    latitude: coordinates[0].latitude,
    longitude: coordinates[coordinates.length - 1].longitude,
    latitudeDelta: 0.0992,
    longitudeDelta: 0.0721,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, [navigation, name]);

  return (
    <View style={styles.root}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={false}
        showsCompass={false}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        region={selectedRegion}
      >
        {coordinates.length > 0 && (
          <Fragment>
            {coordinates.map((coordinate, index) => (
              <Marker key={index} draggable={false} coordinate={coordinate}>
                <Octicons
                  disabled
                  name='dot'
                  size={24}
                  color={'rgba(69,103,155,10)'}
                />
              </Marker>
            ))}
            <Polygon
              coordinates={coordinates}
              strokeColor='rgba(69,103,155,10)'
              fillColor='rgba(69,103,155,0.3)'
              strokeWidth={6}
            />
          </Fragment>
        )}
      </MapView>
      <View style={styles.absolute}>
        <Button label='Go Back' onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default ViewRegionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});
