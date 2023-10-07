import { StyleSheet, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from 'react-native-maps';
import SaveRegionModal from '@/components/create-region/save-region-modal';
import Button from '@/components/ui/button';
import { Octicons } from '@expo/vector-icons';
import useModal from '@/hooks/useModal';
import { initialRegion } from '@/constants';
import { CreateRegionScreenProps } from '@/interfaces/screens';
import { useAppDispatch } from '@/redux/store';
import { addRegion } from '@/redux/saved-regions-state.slice';
import { ISavedRegion } from '@/interfaces/common';
import { calculateArea } from '@/helpers/area';
import { successFlash, warningFlash } from '@/helpers/flash-message';

const CreateRegionScreen: React.FC<CreateRegionScreenProps> = ({
  navigation,
  route,
}) => {
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const { closeModal, modalVisible, openModal } = useModal();

  const dispatch = useAppDispatch();

  const checkCoordinates = (coordinates: LatLng[]) => {
    if (coordinates.length < 3) {
      warningFlash('You need at least 3 points to create a region');
      return false;
    }
    return true;
  };

  const handleUndo = () => {
    setCoordinates((prev) => prev.slice(0, prev.length - 1));
    if (coordinates.length === 1) setDrawingMode(false);
  };

  const handleMapPress = (e: MapPressEvent) => {
    if (drawingMode) {
      const newCoordinate = e.nativeEvent.coordinate;
      setCoordinates((prev) => [...prev, newCoordinate]);
    }
  };

  const handleAbortDrawing = () => {
    setDrawingMode(false);
    setCoordinates([]);
  };

  const handleSaveRegion = (name: string) => {
    const area = calculateArea(coordinates);
    const payload: ISavedRegion = {
      id: Date.now().toString(),
      name,
      area,
      region: coordinates,
    };
    dispatch(addRegion(payload));
    setDrawingMode(false);
    setCoordinates([]);
    closeModal();
    successFlash('Region saved');
    navigation.goBack();
  };

  const handleFinishDrawing = () => {
    if (!checkCoordinates(coordinates)) return;
    openModal();
  };

  return (
    <React.Fragment>
      <View style={styles.root}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={!drawingMode}
          showsCompass={!drawingMode}
          showsMyLocationButton={!drawingMode}
          showsPointsOfInterest={!drawingMode}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          {coordinates.length > 0 && (
            <Fragment>
              {coordinates.map((coordinate, index) => (
                <Marker key={index} draggable={false} coordinate={coordinate}>
                  <Octicons
                    disabled
                    name='dot'
                    size={24}
                    color={
                      index === 0
                        ? 'green'
                        : index === coordinates.length - 1
                        ? 'red'
                        : 'black'
                    }
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
          {drawingMode ? (
            <View style={styles.buttonContainer}>
              <Button
                containerStyle={{ flex: 1 }}
                label={'Save'}
                disabled={coordinates.length < 3}
                onPress={handleFinishDrawing}
              />
              <Button
                containerStyle={{ flex: 1 }}
                label='Undo'
                disabled={coordinates.length === 0}
                onPress={handleUndo}
              />
              <Button
                containerStyle={{ flex: 1 }}
                label='Abort'
                onPress={handleAbortDrawing}
              />
            </View>
          ) : (
            <Button
              label='Start drawing'
              onPress={() => setDrawingMode(true)}
            />
          )}
        </View>
      </View>

      <SaveRegionModal
        visible={modalVisible}
        onSave={handleSaveRegion}
        onDismiss={closeModal}
      />
    </React.Fragment>
  );
};

export default CreateRegionScreen;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
