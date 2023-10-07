import { TextStyle, ViewStyle } from 'react-native';

// UI Components

export interface IInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  labelStyle?: TextStyle | TextStyle[];
  error?: string;
  errorStyle?: TextStyle | TextStyle[];
}

export interface IButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export interface IconButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
}

export interface IModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  modalTitle?: string;
  containerStyle?: ViewStyle | ViewStyle[];
}

// custom components

export interface ISaveRegionModalProps {
  onSave: (name: string) => void;
  visible: boolean;
  onDismiss: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
}
