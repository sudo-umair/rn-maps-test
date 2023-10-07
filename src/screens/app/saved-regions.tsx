import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SavedRegionsScreenProps } from '@/interfaces/screens';
import Button from '@/components/ui/button';
import { AppScreens } from '@/interfaces/common';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import IconButton from '@/components/ui/icon-button';
import { removeRegion } from '@/redux/saved-regions-state.slice';
import { Ionicons } from '@expo/vector-icons';
import { successFlash } from '@/helpers/flash-message';

const SavedRegionsScreen: React.FC<SavedRegionsScreenProps> = ({
  navigation,
  route,
}) => {
  const savedRegions = useAppSelector(
    (state) => state.savedRegions.savedRegions
  );

  const dispatch = useAppDispatch();

  const handleNavigateToCreateRegion = () => {
    navigation.navigate(AppScreens.CreateRegion);
  };

  const handleDeleteRegion = (id: string) => {
    Alert.alert(
      'Delete region',
      'Are you sure you want to delete this region?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeRegion(id));
            successFlash('Region deleted');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <Button onPress={handleNavigateToCreateRegion} label='Create' />
      <FlatList
        data={savedRegions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.regionItem}
            onPress={() =>
              navigation.navigate(AppScreens.ViewRegion, { region: item })
            }
          >
            <View style={styles.leftCol}>
              <Text style={styles.name}>{item.name ?? 'Unnamed region'}</Text>
              <Text style={styles.description}>
                {item.area ?? 'No description'}
              </Text>
            </View>
            <View style={styles.rightCol}>
              <IconButton
                containerStyle={styles.iconButton}
                onPress={() => handleDeleteRegion(item.id)}
              >
                <Ionicons name='md-trash-bin-sharp' size={28} color='red' />
              </IconButton>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SavedRegionsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e7e7e750',
    margin: 8,
    borderRadius: 8,
  },
  leftCol: {
    width: '85%',
  },
  rightCol: {
    width: '15%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  iconButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
});
