import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { HomeScreenProps } from '@/interfaces/screens';
import * as Location from 'expo-location';
import useForceUpdate from '@/hooks/useForceUpdate';
import Button from '@/components/ui/button';
import useError from '@/hooks/useError';
import IconButton from '@/components/ui/icon-button';
import { AppScreens } from '@/interfaces/common';
import { Ionicons } from '@expo/vector-icons';
import { initialRegion } from '@/constants';
import { errorFlash, warningFlash } from '@/helpers/flash-message';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [location, setLocation] = useState<Region | null>(null);

  const { error, errorVisible, clearError, setError } = useError();
  const { forceUpdate, trigger } = useForceUpdate();

  const handleNavigate = () => navigation.navigate(AppScreens.SavedRegions);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={handleNavigate}>
          <Ionicons name='list' size={24} color='black' />
        </IconButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      clearError();
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        setError('Permission to access location was denied');
        errorFlash('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!location) {
        setError('Location not found');
        warningFlash('Location not found');
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
    <React.Fragment>
      <View style={styles.root}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          showsCompass
          showsMyLocationButton
          showsPointsOfInterest
          region={location ?? initialRegion}
          initialRegion={initialRegion}
        ></MapView>
      </View>
    </React.Fragment>
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
