import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { HomeScreenProps } from '@/interfaces/screens';
import * as Location from 'expo-location';
import useForceUpdate from '@/hooks/useForceUpdate';
import Button from '@/components/ui/button';
import useError from '@/hooks/useError';

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [location, setLocation] = useState<Region | null>(null);

  const { error, errorVisible, clearError, setError } = useError();
  const { forceUpdate, trigger } = useForceUpdate();

  useEffect(() => {
    (async () => {
      clearError();
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!location) {
        setError('Location not found');
        return;
      }

      setLocation({
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitude: location.coords.longitude,
        longitudeDelta: 0.0421,
      });
    })();
  }, [trigger]);

  if (errorVisible) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>{error}</Text>
        <Button label='Try again' onPress={() => forceUpdate()} />
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation
      showsCompass
      showsMyLocationButton
      region={location ?? initialRegion}
      initialRegion={initialRegion}
      showsPointsOfInterest
    ></MapView>
  );
};

export default HomeScreen;

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
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
