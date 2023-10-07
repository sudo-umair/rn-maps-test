import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IButtonProps } from '@/interfaces/components';

const Button: React.FC<IButtonProps> = ({
  containerStyle,
  label,
  onPress,
  textStyle,
  disabled,
}) => {
  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleOnPress}
      style={[styles.container, containerStyle, disabled && styles.disabled]}
    >
      <Text style={[styles.text, textStyle]}>{label ?? 'Button'}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
