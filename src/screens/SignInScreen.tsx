import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const auth = getAuth();

const SignInScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text: string) => setValue({...value, email: text})}
        />

        <TextInput
          placeholder="Password"
          value={value.password}
          onChangeText={(text: string) => setValue({...value, password: text})}
          secureTextEntry={true}
        />

        <Button title="Sign in" onPress={signIn} />
        <Button
          title="To Sign up"
          onPress={() => {
            navigation.navigate('signUp' as never);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flex: 1,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignInScreen;
