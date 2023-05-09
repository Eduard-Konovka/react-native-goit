import React, { useRef, useEffect } from 'react';
import {
  Animated,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

export default function CoverScreen({ onFinal }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 7000,
      useNativeDriver: true,
    }).start(onFinal);
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image style={styles.logo} source={require('assets/logo.png')} />

        <Text style={styles.title}>
          FrejaSafe a social rescue system enabling fast response to danger
        </Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 262,
    height: 144,
    marginTop: 264,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    width: 262,
    marginTop: 56,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#fafbff',
  },
});
