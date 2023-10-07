import { StyleSheet, Text, View, Modal as RN_Modal } from 'react-native';
import React from 'react';
import { IModalProps } from '@/interfaces/components';
import IconButton from './icon-button';
import { Ionicons } from '@expo/vector-icons';

const Modal: React.FC<IModalProps> = ({
  children,
  onDismiss,
  visible,
  modalTitle,
  containerStyle,
}) => {
  return (
    <RN_Modal
      animationType='fade'
      transparent={true}
      onDismiss={onDismiss}
      visible={visible}
      statusBarTranslucent
      style={{ flex: 1 }}
    >
      <View style={styles.root}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{modalTitle ?? 'Modal'}</Text>
            <IconButton
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 10,
              }}
              onPress={onDismiss}
            >
              <Ionicons name='close' size={30} color='#000' />
            </IconButton>
          </View>
          {children}
        </View>
      </View>
    </RN_Modal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
