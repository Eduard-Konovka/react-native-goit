import React from 'react';
import { ImageBackground, Image, StyleSheet, Text } from 'react-native';

export default function WelcomeScreen1() {
  return (
    <ImageBackground
      source={require('assets/background/3.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Image style={styles.image} source={require('assets/welcomePage1.png')} />
      <Text style={styles.title}>Share your location to feel safe</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 198,
    height: 319,
    marginTop: 163,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    width: 326,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#eefbff',
  },
});
