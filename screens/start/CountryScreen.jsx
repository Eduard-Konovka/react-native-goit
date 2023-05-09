import React, { useState } from 'react';
import { ImageBackground, Text, Alert, StyleSheet } from 'react-native';
import { Button, RadioButton } from 'components';
import { CONTRY } from 'constants';

export default function CountryScreen({ onPress }) {
  const [checked, setChecked] = useState(null);

  const handleRadioButton = value => {
    setChecked(value);
  };

  const handlePress = () => {
    checked
      ? onPress(checked)
      : Alert.alert(
          'You did not select a country',
          'Select a country from the list',
          [{ text: 'Ok' }],
        );
  };

  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Text style={styles.title}>Please, choose a country:</Text>

      <RadioButton
        items={CONTRY}
        checked={checked}
        style={styles.form}
        onPress={handleRadioButton}
      />

      <Button
        text="Next step"
        inactive={!checked}
        style={{ marginTop: 40 }}
        handlePress={handlePress}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    width: 326,
    marginTop: 132,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#D9D9D9',
  },
  form: {
    width: 326,
    maxHeight: 280,
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#ECF2F624',
    borderRadius: 14,
  },
});
