import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Image,
  Text,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { PROFILE } from 'constants';

export default function Profile({ navigation }) {
  const language = useLanguage();

  const [pressEmergency, setPressEmergency] = useState(false);
  const [gettingCoords, setGettingCoords] = useState(false);
  const [coords, setCoords] = useState(null);
  const [pressHelp, setPressHelp] = useState(false);
  const [pressDanger, setPressDanger] = useState(false);

  const languageDeterminer = obj => languageWrapper(language, obj);

  useEffect(() => {
    gettingCoords && pressEmergency
      ? Animated.loop(
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ).start()
      : Animated.loop(
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ).reset();
  }, [gettingCoords, pressEmergency]);

  let rotateValue = useRef(new Animated.Value(0)).current;
  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getLocation = async () => {
    setCoords(null);
    setGettingCoords(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setCoords(languageDeterminer(PROFILE.alert.description));
      setGettingCoords(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync();

    if (typeof coords === 'string') {
      Alert.alert(languageDeterminer(PROFILE.alert.title), coords, [
        { text: 'Ok' },
      ]);
      setGettingCoords(false);
    } else {
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setGettingCoords(false);
    }
  };

  const handlePressEmergency = () => {
    if (pressEmergency) {
      setPressHelp(false);
      setPressDanger(false);
    } else {
      getLocation();
    }

    setPressEmergency(!pressEmergency);
  };

  const handlePressHelp = coords => {
    navigation.navigate('Notifications', {
      latitude: coords.latitude,
      longitude: coords.longitude,
      zoom: 10,
    });
  };

  const handlePressDanger = coords => {
    navigation.navigate('Notifications', {
      latitude: coords.latitude,
      longitude: coords.longitude,
      zoom: 15,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>
        {pressEmergency && !coords
          ? languageDeterminer(PROFILE.title.gettingCoords)
          : pressEmergency && coords
          ? languageDeterminer(PROFILE.title.helpChoice)
          : languageDeterminer(PROFILE.title.emergency)}
      </Text>

      <Pressable style={styles.emergencyBtn} onPress={handlePressEmergency}>
        <LinearGradient
          style={styles.emergencyBG}
          colors={
            pressEmergency
              ? ['#07E1CC', '#008BAE']
              : ['rgba(236, 242, 247, 0.24)', 'rgba(236, 242, 247, 0.24)']
          }
          start={{ x: 0.5, y: 0 }}
        >
          <Image style={styles.logo} source={require('assets/spinner.png')} />
        </LinearGradient>
      </Pressable>

      <View style={styles.helpBox}>
        <View style={styles.helpItem}>
          <Pressable
            style={styles.helpBtn}
            onPressIn={() => {
              coords && setPressHelp(!pressHelp);
            }}
            onPressOut={() => {
              coords && pressHelp && handlePressHelp(coords);
            }}
          >
            <LinearGradient
              style={{ ...styles.helpBtn }}
              colors={
                pressEmergency && pressHelp
                  ? ['#07E1CC', '#008BAE']
                  : ['rgba(236, 242, 247, 0.24)', 'rgba(236, 242, 247, 0.24)']
              }
              start={{ x: 0.5, y: 0 }}
            >
              <Animated.Image
                style={[
                  styles.helpImage,
                  { transform: [{ rotateY: RotateData }] },
                ]}
                source={require('assets/handshake.png')}
              />
            </LinearGradient>
          </Pressable>

          <Text style={styles.helpText}>
            {languageDeterminer(PROFILE.button.help)}
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Pressable
            style={styles.helpBtn}
            onPressIn={() => {
              coords && setPressDanger(!pressDanger);
            }}
            onPressOut={() => {
              coords && pressDanger && handlePressDanger(coords);
            }}
          >
            <LinearGradient
              style={{ ...styles.helpBtn }}
              colors={
                pressEmergency && pressDanger
                  ? ['#07E1CC', '#008BAE']
                  : ['rgba(236, 242, 247, 0.24)', 'rgba(236, 242, 247, 0.24)']
              }
              start={{ x: 0.5, y: 0 }}
            >
              <Animated.Image
                style={[
                  styles.helpImage,
                  { transform: [{ rotateY: RotateData }] },
                ]}
                source={require('assets/heart.png')}
              />
            </LinearGradient>
          </Pressable>

          <Text style={styles.helpText}>
            {languageDeterminer(PROFILE.button.danger)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleScreen: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
  },
  emergencyBtn: {
    width: 256,
    height: 256,
    marginTop: 40,
  },
  emergencyBG: {
    width: '100%',
    height: '100%',
    borderRadius: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 222,
    height: 222,
  },
  helpBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  helpItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    height: 164,
  },
  helpBtn: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#499BD4',
    borderRadius: 14,
  },
  helpImage: {
    width: 100,
    height: 100,
  },
  helpText: {
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
  },
});
