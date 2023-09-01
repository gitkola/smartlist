import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const auth = getAuth();

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>

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

        <Button title="Sign up" onPress={signUp} />
        <Button
          title="To Sign in"
          onPress={() => {
            navigation.navigate('signIn' as never);
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

export default SignUpScreen;
