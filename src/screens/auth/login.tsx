import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LoginScreenProps } from '@/interfaces/screens';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
