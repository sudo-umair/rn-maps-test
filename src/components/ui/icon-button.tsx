import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { IconButtonProps } from '@/interfaces/components';

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onPress,
  disabled,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    // aspectRatio: 1,
    // padding: 5,
  },
});
