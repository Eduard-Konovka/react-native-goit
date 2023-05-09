import React from 'react';
import { ImageBackground, Image, StyleSheet, Text } from 'react-native';

export default function WelcomeScreen2() {
  return (
    <ImageBackground
      source={require('assets/background/3.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Image style={styles.image} source={require('assets/welcomePage2.png')} />
      <Text style={styles.title}>Get an instant response on your alert</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 366,
    height: 369,
    marginTop: 112,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    width: 326,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#eefbff',
  },
});
