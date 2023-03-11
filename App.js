import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [swichResult, setSwichResult] = useState('Disabled switch');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setSwichResult(isEnabled ? 'Disabled switch' : 'Enabled switch');
  };

  return (
    <View style={styles.container}>
      <Text>{swichResult}</Text>

      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <StatusBar style="auto" />
    </View>
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
