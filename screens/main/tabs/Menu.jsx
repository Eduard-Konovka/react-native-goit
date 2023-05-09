import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useLanguage } from 'context';
import { authSignOutUser } from 'redux';
import { languageWrapper } from 'middlewares';
import { BluetoothLowEnergy } from 'components';
import { EditProfile, EditContacts, EditShortGuide } from './nested';
import { MENU } from 'constants';

export default function Menu({ navigation }) {
  const language = useLanguage();
  const dispatch = useDispatch();

  const [subMenu, setSubMenu] = useState(null);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const stylesButton = ({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgba(236, 242, 247, 0.5)'
        : 'rgba(236, 242, 247, 0.24)',
    },
    styles.buttonContainer,
  ];

  const stylesArrowButton = ({ pressed }) => [
    {
      backgroundColor: pressed ? 'rgba(236, 242, 247, 0.5)' : null,
    },
    styles.arrowBtn,
  ];

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      {!subMenu ? (
        <>
          <Text style={styles.titleScreen}>
            {languageDeterminer(MENU.title)}
          </Text>

          <Pressable
            style={stylesButton}
            onPressOut={() => setSubMenu('profile')}
          >
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.profile)}
            </Text>
          </Pressable>

          <Pressable
            style={stylesButton}
            onPressOut={() => setSubMenu('contacts')}
          >
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.contacts)}
            </Text>
          </Pressable>

          <Pressable
            style={stylesButton}
            onPressOut={() => setSubMenu('settings')}
          >
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.settings)}
            </Text>
          </Pressable>

          <Pressable
            style={stylesButton}
            onPressOut={() => setSubMenu('guide')}
          >
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.guide)}
            </Text>
          </Pressable>

          <Pressable style={stylesButton} onPressOut={() => setSubMenu('help')}>
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.help)}
            </Text>
          </Pressable>

          <Pressable
            style={stylesButton}
            onPressOut={() => setSubMenu('subscribtion')}
          >
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.subscribtion)}
            </Text>
          </Pressable>

          <Pressable style={stylesButton} onPressOut={signOut}>
            <Text style={styles.btnText}>
              {languageDeterminer(MENU.button.signOut)}
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={stylesArrowButton}
            onPressOut={() => setSubMenu(null)}
          >
            <Image source={require('assets/arrow.png')} />
          </Pressable>

          <View style={styles.subMenu}>
            {subMenu === 'profile' && (
              <EditProfile
                navigation={navigation}
                setSubMenu={() => setSubMenu(null)}
              />
            )}

            {subMenu === 'contacts' && <EditContacts />}

            {subMenu === 'settings' && <BluetoothLowEnergy />}

            {subMenu === 'guide' && <EditShortGuide />}

            {subMenu === 'help' && (
              <Text style={styles.titleScreen}>Help centre</Text>
            )}

            {subMenu === 'subscribtion' && (
              <Text style={styles.titleScreen}>Subscribtion</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMenu: {
    flex: 1,
    width: '100%',
  },
  titleScreen: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
    marginBottom: 48,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 62,
    padding: 22,
    borderRadius: 14,
    marginBottom: 8,
  },
  btnText: {
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: '#FFFFFF',
  },
  arrowBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 'auto',
  },
});
