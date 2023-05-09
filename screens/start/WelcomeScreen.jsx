import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Loader } from 'components';
import { WelcomeScreen1, WelcomeScreen2, WelcomeScreen3 } from './Welcome';

export default function WelcomeScreen({ onPress }) {
  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      loadMinimalLoader={<Loader />}
      dot={<Image source={require('assets/dot.png')} style={styles.dot} />}
      activeDot={
        <Image source={require('assets/activeDot.png')} style={styles.dot} />
      }
    >
      <WelcomeScreen1 />

      <WelcomeScreen2 />

      <WelcomeScreen3 onPress={onPress} />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 1,
    marginBottom: 14,
  },
});
