import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { EDIT_PROFILE } from 'constants';

export default function EditProfile({ navigation, setSubMenu }) {
  const language = useLanguage();

  const languageDeterminer = obj => languageWrapper(language, obj);

  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>
        {languageDeterminer(EDIT_PROFILE.title)}
      </Text>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('PhotoLibrary')}
      >
        <Text style={styles.btnText}>
          {languageDeterminer(EDIT_PROFILE.button.library)}
        </Text>
      </Pressable>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('PhotoCamera')}
      >
        <Text style={styles.btnText}>
          {languageDeterminer(EDIT_PROFILE.button.takePhoto)}
        </Text>
      </Pressable>

      <Pressable style={styles.buttonContainer} onPress={setSubMenu}>
        <Text style={styles.btnText}>
          {languageDeterminer(EDIT_PROFILE.button.cancel)}
        </Text>
      </Pressable>
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
    marginBottom: 50,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 242, 247, 0.18)',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 15,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
