import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { languageWrapper } from 'middlewares';
import { Button } from 'components';
import { BUTTON, APP_SET_UP } from 'constants';

export default function AppSetUpScreen({ language, onPress }) {
  const [checkedBluetooth, setCheckedBluetooth] = useState(false);
  const [checkedLocationService, setCheckedLocationService] = useState(false);
  const [checkedNotifications, setCheckedNotifications] = useState(false);
  const [checkedContacts, setCheckedContacts] = useState(false);
  const [pressBluetooth, setPressBluetooth] = useState(false);
  const [pressLocationService, setPressLocationService] = useState(false);
  const [pressNotifications, setPressNotifications] = useState(false);
  const [pressContacts, setPressContacts] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);

  useEffect(() => {
    checkedBluetooth ||
    checkedLocationService ||
    checkedNotifications ||
    checkedContacts
      ? setCheckedAll(true)
      : setCheckedAll(false);
  }, [
    checkedBluetooth,
    checkedLocationService,
    checkedNotifications,
    checkedContacts,
  ]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const toggleCheckBoxButton = term => {
    switch (term) {
      case 'bluetooth':
        checkedBluetooth
          ? setCheckedBluetooth(false)
          : setCheckedBluetooth(true);
        break;

      case 'location':
        checkedLocationService
          ? setCheckedLocationService(false)
          : setCheckedLocationService(true);

        break;

      case 'notifications':
        checkedNotifications
          ? setCheckedNotifications(false)
          : setCheckedNotifications(true);
        break;

      case 'contacts':
        checkedContacts ? setCheckedContacts(false) : setCheckedContacts(true);
        break;

      default:
        console.log('Error of toggleCheckBoxButton');
        break;
    }
  };

  const handlePress = () => {
    if (
      checkedBluetooth ||
      checkedLocationService ||
      checkedNotifications ||
      checkedContacts
    ) {
      setCheckedAll(true);
      onPress({
        bluetooth: checkedBluetooth,
        location: checkedLocationService,
        notifications: checkedNotifications,
        contacts: checkedContacts,
      });
    } else {
      setCheckedAll(false);
      Alert.alert(
        languageDeterminer(APP_SET_UP.alert.title),
        languageDeterminer(APP_SET_UP.alert.description),
        [{ text: 'Ok' }],
      );
    }
  };

  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Text style={styles.title}>{languageDeterminer(APP_SET_UP.title)}</Text>

      <View style={styles.form}>
        <Pressable
          onPressIn={() => setPressBluetooth(true)}
          onPressOut={() => {
            setPressBluetooth(false);
            toggleCheckBoxButton('bluetooth');
          }}
          style={[
            styles.formItem,
            styles.formItemFirst,
            (checkedBluetooth || pressBluetooth) && styles.activeFormItem,
          ]}
        >
          <View style={styles.checkBox}>
            {checkedBluetooth && (
              <Image
                source={require('assets/checked.png')}
                style={styles.checked}
              />
            )}
          </View>

          <View style={styles.checkBoxTextBlock}>
            <View style={styles.checkBoxTitle}>
              <Image
                source={require('assets/bluetooth.png')}
                style={styles.checkBoxTitleIcon}
              />

              <Text style={styles.checkBoxTitleText}>
                {languageDeterminer(APP_SET_UP.checkBoxes.bluetooth.title)}
              </Text>
            </View>

            <Text style={styles.checkBoxDescription}>
              {languageDeterminer(APP_SET_UP.checkBoxes.bluetooth.description)}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPressIn={() => setPressLocationService(true)}
          onPressOut={() => {
            setPressLocationService(false);
            toggleCheckBoxButton('location');
          }}
          style={[
            styles.formItem,
            (checkedLocationService || pressLocationService) &&
              styles.activeFormItem,
          ]}
        >
          <View style={styles.checkBox}>
            {checkedLocationService && (
              <Image
                source={require('assets/checked.png')}
                style={styles.checked}
              />
            )}
          </View>

          <View style={styles.checkBoxTextBlock}>
            <View style={styles.checkBoxTitle}>
              <Image
                source={require('assets/location.png')}
                style={styles.checkBoxTitleIcon}
              />

              <Text style={styles.checkBoxTitleText}>
                {languageDeterminer(APP_SET_UP.checkBoxes.location.title)}
              </Text>
            </View>

            <Text style={styles.checkBoxDescription}>
              {languageDeterminer(APP_SET_UP.checkBoxes.location.description)}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPressIn={() => setPressNotifications(true)}
          onPressOut={() => {
            setPressNotifications(false);
            toggleCheckBoxButton('notifications');
          }}
          style={[
            styles.formItem,
            (checkedNotifications || pressNotifications) &&
              styles.activeFormItem,
          ]}
        >
          <View style={styles.checkBox}>
            {checkedNotifications && (
              <Image
                source={require('assets/checked.png')}
                style={styles.checked}
              />
            )}
          </View>

          <View style={styles.checkBoxTextBlock}>
            <View style={styles.checkBoxTitle}>
              <Image
                source={require('assets/notifications.png')}
                style={styles.checkBoxTitleIcon}
              />

              <Text style={styles.checkBoxTitleText}>
                {languageDeterminer(APP_SET_UP.checkBoxes.notifications.title)}
              </Text>
            </View>

            <Text style={styles.checkBoxDescription}>
              {languageDeterminer(
                APP_SET_UP.checkBoxes.notifications.description,
              )}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPressIn={() => setPressContacts(true)}
          onPressOut={() => {
            setPressContacts(false);
            toggleCheckBoxButton('contacts');
          }}
          style={[
            styles.formItem,
            styles.formItemLast,
            (checkedContacts || pressContacts) && styles.activeFormItem,
          ]}
        >
          <View style={styles.checkBox}>
            {checkedContacts && (
              <Image
                source={require('assets/checked.png')}
                style={styles.checked}
              />
            )}
          </View>

          <View style={styles.checkBoxTextBlock}>
            <View style={styles.checkBoxTitle}>
              <Image
                source={require('assets/contacts.png')}
                style={styles.checkBoxTitleIcon}
              />

              <Text style={styles.checkBoxTitleText}>
                {languageDeterminer(APP_SET_UP.checkBoxes.contacts.title)}
              </Text>
            </View>

            <Text style={styles.checkBoxDescription}>
              {languageDeterminer(APP_SET_UP.checkBoxes.contacts.description)}
            </Text>
          </View>
        </Pressable>
      </View>

      <Button
        text={languageDeterminer(BUTTON.text)}
        inactive={!checkedAll}
        style={{ marginTop: 40 }}
        handlePress={handlePress}
      />

      <Text style={styles.description1}>
        {languageDeterminer(APP_SET_UP.description.first)}
      </Text>

      <Text style={styles.description2}>
        {languageDeterminer(APP_SET_UP.description.second)}
      </Text>
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
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#ecf2f624',
    borderRadius: 14,
  },
  formItem: {
    height: 76,
    paddingLeft: 22,
    paddingRight: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  formItemFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  formItemLast: {
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  activeFormItem: {
    backgroundColor: '#ECF2F650',
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
  checkBoxTextBlock: {
    marginLeft: 16,
  },
  checkBoxTitle: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBoxTitleIcon: {
    width: 19,
    height: 19,
  },
  checkBoxTitleText: {
    marginLeft: 14,
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
  checkBoxDescription: {
    fontFamily: 'regular400',
    fontSize: 9,
    lineHeight: 11.43,
    letterSpacing: -0.09,
    color: '#EEFBFF',
  },
  description1: {
    marginTop: 52,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'regular400',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.12,
    textAlign: 'center',
    color: '#EEFBFF',
  },
  description2: {
    marginTop: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'regular400',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.12,
    textAlign: 'center',
    color: '#95DFFF',
  },
});
