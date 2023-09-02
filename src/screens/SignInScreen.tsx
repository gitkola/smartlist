import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  useTheme,
  Appbar,
  Snackbar,
} from 'react-native-paper';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {VStack} from '@react-native-material/core';
import DismissKeyboardWithAvoidingView from '../hocs/DismissKeyboardWithAvoidingView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const auth = getAuth();

const SignInScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const theme = useTheme();
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
    signInInProgress: false,
    signUpInProgress: false,
    sendPasswordResetEmailInProgress: false,
    snackbarVisible: false,
    isForgotPassword: false,
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({...value, error: 'Email and password are mandatory.'});
      return;
    }

    try {
      setValue({...value, signInInProgress: true});
      await signInWithEmailAndPassword(auth, value.email, value.password);
      setValue({...value, signInInProgress: false});
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
        signInInProgress: false,
      });
    }
  }

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      setValue({...value, signUpInProgress: true});
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      setValue({...value, signUpInProgress: false});
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
        signUpInProgress: false,
      });
    }
  }

  async function resetPassword() {
    if (value.email === '') {
      setValue({
        ...value,
        error: 'Email is mandatory.',
      });
      return;
    }

    try {
      setValue({...value, sendPasswordResetEmailInProgress: true});
      await sendPasswordResetEmail(auth, value.email);
      setValue({
        ...value,
        sendPasswordResetEmailInProgress: false,
        snackbarVisible: true,
        isForgotPassword: false,
      });
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
        sendPasswordResetEmailInProgress: false,
      });
    }
  }

  return (
    <DismissKeyboardWithAvoidingView>
      <VStack
        fill
        spacing={16}
        ph={32}
        pv={Platform.OS === 'ios' ? 140 : 90}
        style={{backgroundColor: theme.colors.background}}>
        <VStack>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {!value.isForgotPassword
              ? 'Sign in to use Cloud ToDo List'
              : 'Reset password'}
          </Text>
          <View style={{height: 16}} />
          <TextInput
            label={'Email'}
            mode="outlined"
            placeholder="Email"
            value={value.email}
            activeOutlineColor={theme.colors.secondary}
            onChangeText={(text: string) =>
              setValue({...value, email: text, error: ''})
            }
          />
          {!value.isForgotPassword && (
            <>
              <View style={{height: 16}} />
              <TextInput
                label={'Password'}
                mode="outlined"
                placeholder="Password"
                value={value.password}
                activeOutlineColor={theme.colors.secondary}
                onChangeText={(text: string) =>
                  setValue({...value, password: text, error: ''})
                }
                secureTextEntry={true}
              />
            </>
          )}
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.error,
              paddingVertical: 16,
            }}>
            {value.error ? value.error : ' '}
          </Text>
          {!value.isForgotPassword ? (
            <>
              <Button
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.onSecondary}
                mode="contained"
                onPress={signIn}
                disabled={value.signInInProgress}
                loading={value.signInInProgress}>
                SIGN IN
              </Button>
              <Text
                style={{alignSelf: 'center', fontSize: 16, paddingVertical: 8}}>
                or
              </Text>
              <Button
                textColor={theme.colors.secondary}
                mode="outlined"
                onPress={signUp}
                disabled={value.signUpInProgress}
                loading={value.signUpInProgress}>
                SIGN UP
              </Button>
              <View style={{height: 16}} />
              <Button
                textColor={theme.colors.secondary}
                onPress={() => {
                  setValue({
                    ...value,
                    error: '',
                    isForgotPassword: true,
                  });
                }}>
                FORGOT PASSWORD
              </Button>
            </>
          ) : (
            <>
              <Button
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.onSecondary}
                mode="contained"
                onPress={resetPassword}
                disabled={value.sendPasswordResetEmailInProgress}
                loading={value.sendPasswordResetEmailInProgress}>
                SEND PASSWORD RESET EMAIL
              </Button>
              <View style={{height: 16}} />
              <Button
                textColor={theme.colors.secondary}
                onPress={() => {
                  setValue({
                    ...value,
                    error: '',
                    isForgotPassword: false,
                  });
                }}>
                BACK TO SIGN IN
              </Button>
            </>
          )}
        </VStack>
        <Appbar
          elevated
          safeAreaInsets={{top}}
          style={{
            height: Platform.OS === 'ios' ? 110 : 60,
            backgroundColor: theme.colors.primary,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}>
          <Appbar.Action
            icon={'menu'}
            iconColor={theme.colors.onPrimary}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <Appbar.Content title={'Cloud ToDo'} color={theme.colors.onPrimary} />
        </Appbar>
        <Snackbar
          visible={value.snackbarVisible}
          onDismiss={() =>
            setValue(pevValue => ({
              ...pevValue,
              snackbarVisible: false,
            }))
          }
          action={{
            label: 'close',
          }}>
          Please check your email.
        </Snackbar>
      </VStack>
    </DismissKeyboardWithAvoidingView>
  );
};

export default SignInScreen;
