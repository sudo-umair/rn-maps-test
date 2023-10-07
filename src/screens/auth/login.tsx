import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { LoginScreenProps } from '@/interfaces/screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { ILoginState } from '@/interfaces/data';
import { deepClone } from '@/helpers/functions';
import { useAppDispatch } from '@/redux/store';
import { login } from '@/redux/app-state.slice';
import { successFlash, warningFlash } from '@/helpers/flash-message';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const initialState: ILoginState = { email: '', password: '' };

  const [payload, setPayload] = useState<ILoginState>(() =>
    deepClone<ILoginState>({
      email: 'admin@test.com',
      password: 'Admin123',
    })
  );
  const [errors, setErrors] = useState<ILoginState>(
    deepClone<ILoginState>(initialState)
  );

  const dispatch = useAppDispatch();

  const handleOnChangeText = (key: keyof ILoginState, value: string) => {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    if (errors[key]) {
      resetError(key);
    }
  };

  const handleErrors = (key: keyof ILoginState, value: string) => {
    setErrors((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const resetError = (key: keyof ILoginState) => {
    setErrors((prev) => {
      return {
        ...prev,
        [key]: '',
      };
    });
  };

  const resetAllErrors = () => setErrors(deepClone<ILoginState>(initialState));

  const isError = useMemo(() => {
    return Object.values(errors).some((error) => error !== '');
  }, [errors]);

  const validate = (payload: ILoginState): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const { email, password } = payload;
    if (!emailRegex.test(email)) {
      handleErrors('email', 'Please enter a valid email address');
      return false;
    }
    if (!passwordRegex.test(password)) {
      handleErrors(
        'password',
        'Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      );
      return false;
    }
    warningFlash('Login failed, please try again');
    return true;
  };

  const handleLogin = () => {
    resetAllErrors();
    if (validate(payload)) {
      dispatch(login());
      successFlash('Login successful');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView behavior='position' style={styles.root}>
        <Input
          label='Email'
          placeholder='Email'
          value={payload.email}
          error={errors.email}
          onChangeText={(value) => handleOnChangeText('email', value)}
        />

        <Input
          label='Password'
          placeholder='Password'
          value={payload.password}
          onChangeText={(value) => handleOnChangeText('password', value)}
          error={errors.password}
          secureTextEntry
        />

        <Button label='Login' disabled={isError} onPress={handleLogin} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
  },
});
