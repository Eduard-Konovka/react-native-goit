import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [swichResult, setSwichResult] = useState('Disabled switch');
  const [value, setValue] = useState('');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setSwichResult(isEnabled ? 'Disabled switch' : 'Enabled switch');
  };

  const inputHandler = text => setValue(text);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            placeholder="Type text"
            value={value}
            onChangeText={inputHandler}
          />
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
