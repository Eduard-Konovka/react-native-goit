import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';

export default function EditShortGuide() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [swichResult, setSwichResult] = useState('Disabled switch');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { height, width, scale, fontScale } = useWindowDimensions();

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setSwichResult(isEnabled ? 'Disabled switch' : 'Enabled switch');
  };

  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    Alert.alert('Credentials', `${name} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.titleScreen}>Short guide</Text>

        <Text>{swichResult}</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Username"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />

          <Button title="Login" onPress={onLogin} />

          <View style={styles.separator} />
        </KeyboardAvoidingView>

        <Text style={styles.text}>Window height: {height}</Text>
        <Text style={styles.text}>Window width: {width}</Text>
        <Text style={styles.text}>Font scale: {fontScale}</Text>
        <Text style={styles.text}>Pixel ratio: {scale}</Text>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleScreen: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
    marginBottom: 48,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  separator: {
    marginTop: 10,
  },
  text: {
    fontFamily: 'regular400',
    fontSize: 18,
    marginBottom: 10,
    color: '#50D9AF',
  },
});
