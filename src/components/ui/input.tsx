import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { IInputProps } from '@/interfaces/components';

const Input: React.FC<IInputProps> = ({
  onChangeText,
  value,
  containerStyle,
  error,
  errorStyle,
  inputStyle,
  label,
  labelStyle,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
});
