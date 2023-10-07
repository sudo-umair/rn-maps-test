import AppNavigator from '@/navigation';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppNavigator />
        </PersistGate>
      </Provider>
      <FlashMessage hideOnPress floating position={'center'} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
