import React from 'react';
import { ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'components';

export default function WelcomeScreen3({ onPress }) {
  return (
    <ImageBackground
      source={require('assets/background/3.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <Image source={require('assets/start.png')} style={styles.image} />

      <Text style={styles.title}>
        Connect to community and help other stay free from danger
      </Text>

      <Button
        text="Get started"
        style={{ marginTop: 40 }}
        handlePress={onPress}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 259,
    height: 354,
    marginTop: 126,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    width: 326,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 26,
    paddingRight: 26,
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#EEFBFF',
  },
});
