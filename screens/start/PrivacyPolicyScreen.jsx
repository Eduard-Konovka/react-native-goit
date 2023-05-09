import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  Pressable,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { languageWrapper } from 'middlewares';
import { Button } from 'components';
import { BUTTON, PRIVACY_POLICY } from 'constants';

export default function PrivacyPolicyScreen({ language, onPress }) {
  const [checkedAgreement, setCheckedAgreement] = useState(false);
  const [checkedReading, setCheckedReading] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);

  useEffect(() => {
    checkedAgreement && checkedReading
      ? setCheckedAll(true)
      : setCheckedAll(false);
  }, [checkedAgreement, checkedReading]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const toggleCheckBoxButton = term => {
    switch (term) {
      case 'agreement':
        checkedAgreement
          ? setCheckedAgreement(false)
          : setCheckedAgreement(true);
        break;

      case 'reading':
        checkedReading ? setCheckedReading(false) : setCheckedReading(true);
        break;

      default:
        console.log('Error of toggleCheckBoxButton');
        break;
    }
  };

  const handlePress = () => {
    if (checkedAgreement && checkedReading) {
      setCheckedAll(true);
      onPress();
    } else {
      setCheckedAll(false);
      Alert.alert(
        languageDeterminer(PRIVACY_POLICY.alert.title),
        languageDeterminer(PRIVACY_POLICY.alert.description),
        [{ text: 'Ok' }],
      );
    }
  };

  return (
    <ImageBackground
      source={require('assets/background/3.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {languageDeterminer(PRIVACY_POLICY.terms.title)}
        </Text>

        <Text style={styles.description}>
          {languageDeterminer(PRIVACY_POLICY.terms.description)}
        </Text>

        <Text style={styles.title}>
          {languageDeterminer(PRIVACY_POLICY.contents.title)}
        </Text>

        <Text style={styles.description}>
          {languageDeterminer(PRIVACY_POLICY.contents.description)}
        </Text>

        <View style={styles.form}>
          <Pressable
            onPress={() => toggleCheckBoxButton('agreement')}
            style={styles.formItem}
          >
            <View style={styles.checkBox}>
              {checkedAgreement && (
                <Image
                  source={require('assets/checked.png')}
                  style={styles.checked}
                />
              )}
            </View>

            <Text style={styles.checkBoxText}>
              {languageDeterminer(PRIVACY_POLICY.checkBox1)}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => toggleCheckBoxButton('reading')}
            style={styles.formItem}
          >
            <View style={styles.checkBox}>
              {checkedReading && (
                <Image
                  source={require('assets/checked.png')}
                  style={styles.checked}
                />
              )}
            </View>

            <Text style={styles.checkBoxText}>
              {languageDeterminer(PRIVACY_POLICY.checkBox2)}
            </Text>
          </Pressable>
        </View>

        <Button
          text={languageDeterminer(BUTTON.text)}
          inactive={!checkedAll}
          style={{ marginTop: 40 }}
          handlePress={handlePress}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 32,
  },
  title: {
    width: 326,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'semiBold600',
    fontSize: 19,
    lineHeight: 24.17,
    letterSpacing: -0.19,
    color: '#EEFBFF',
  },
  description: {
    width: 326,
    marginTop: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20.35,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
  form: {
    width: 326,
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formItem: {
    height: 38,
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkBox: {
    height: 16,
    width: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ECF2F624',
  },
  checked: {
    width: 16,
    height: 16,
  },
  checkBoxText: {
    width: 294,
    marginLeft: 16,
    fontFamily: 'regular400',
    fontSize: 9,
    lineHeight: 11.43,
    letterSpacing: -0.09,
    color: '#EEFBFF',
  },
});
