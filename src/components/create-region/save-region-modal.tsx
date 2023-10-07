import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ISaveRegionModalProps } from '@/interfaces/components';
import Modal from '../ui/modal';
import Input from '../ui/input';
import Button from '../ui/button';

const SaveRegionModal: React.FC<ISaveRegionModalProps> = ({
  onDismiss,
  onSave,
  visible,
  containerStyle,
}) => {
  const [regionName, setRegionName] = useState<string>('');

  const handleSaveRegion = () => {
    onSave(regionName);
    setRegionName('');
  };

  return (
    <Modal
      onDismiss={onDismiss}
      containerStyle={containerStyle}
      visible={visible}
      modalTitle='Save Region'
    >
      <View style={styles.root}>
        <Input
          onChangeText={(text) => setRegionName(text)}
          value={regionName}
          label='Region Name'
          placeholder='Enter region name'
        />
        <Button
          onPress={handleSaveRegion}
          disabled={regionName.trim() === ''}
          label='Save'
        />
      </View>
    </Modal>
  );
};

export default SaveRegionModal;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
});
