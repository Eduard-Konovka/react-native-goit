import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { doc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from 'db';
import { Loader, Button } from 'components';
import { CONTACTS } from 'constants';

export default function Contacts({ route }) {
  const language = useLanguage();
  const { name } = useSelector(state => state.auth);

  const [snapshotIsReady, setSnapshotIsReady] = useState(false);
  const [settings, setSettings] = useState([]);
  const [setting, setSetting] = useState('');

  const languageDeterminer = obj => languageWrapper(language, obj);

  const profileId = route.params?.profileId;

  useEffect(() => {
    onSnapshot(
      collection(db, `profiles/${profileId}/settings`),
      snapshot => {
        setSettings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setSnapshotIsReady(true);
      },
      error => {
        Alert.alert(languageDeterminer(CONTACTS.alert.snapshotError), error, [
          { text: 'Ok' },
        ]);
        setSnapshotIsReady(true);
      },
    );
  }, [route]);

  const createSetting = async () => {
    const profileRef = doc(db, 'profiles', profileId);

    try {
      const settingsRef = await addDoc(collection(profileRef, 'settings'), {
        name,
        setting,
      });

      console.log('Setting written with ID: ', settingsRef.id);
    } catch (error) {
      Alert.alert(languageDeterminer(CONTACTS.alert.addingError), error, [
        { text: 'Ok' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>
        {languageDeterminer(CONTACTS.title)}
      </Text>

      {!snapshotIsReady ? (
        <Loader />
      ) : settings.length > 0 ? (
        <FlatList
          style={styles.list}
          data={settings}
          keyExtractor={(item, indx) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={[styles.text, styles.name]}>{item.name}</Text>

              <Text style={[styles.text, styles.textContent]}>
                {item.setting}
              </Text>
            </View>
          )}
        />
      ) : null}

      <View style={styles.btnBox}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setSetting} />
        </View>

        <Button
          text={languageDeterminer(CONTACTS.button)}
          style={styles.btn}
          handlePress={createSetting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  titleScreen: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
    marginTop: 48,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    backgroundColor: 'rgba(236, 242, 247, 0.24)',
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'regular400',
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    color: '#50D9AF',
    marginTop: 10,
  },
  textContent: {
    color: '#EEFBFF',
  },
  btnBox: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    color: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(236, 242, 247, 0.12)',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: 'transparent',
    borderBottomColor: '#20B2AA',
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
  },
});
