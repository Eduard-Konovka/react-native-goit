import React, { useState } from 'react';
import { ImageBackground, Text, Alert, StyleSheet } from 'react-native';
import { Button, RadioButton } from 'components';
import { LANGUAGE } from 'constants';

export default function LanguageScreen({ onPress }) {
  const [checked, setChecked] = useState(null);

  const handleRadioButton = value => {
    setChecked(value);
  };

  const handlePress = () => {
    checked
      ? onPress(checked)
      : Alert.alert(
          'You have not selected a language',
          'Select language from the list',
          [{ text: 'Ok' }],
        );
  };

  return (
    <ImageBackground
      source={require('assets/background/3.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Text style={styles.title}>Please, choose a language:</Text>

      <RadioButton
        items={LANGUAGE}
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
    color: '#d9d9d9',
  },
  form: {
    width: 326,
    maxHeight: 224,
    minHeight: 224,
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#ecf2f624',
    borderRadius: 14,
  },
});
