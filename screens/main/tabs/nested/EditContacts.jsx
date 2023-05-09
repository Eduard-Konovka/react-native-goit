import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from 'db';
import { Loader } from 'components';
import { EDIT_CONTACTS } from 'constants';

export default function EditContacts() {
  const language = useLanguage();
  const { userId } = useSelector(state => state.auth);

  const [snapshotIsReady, setSnapshotIsReady] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  useEffect(() => {
    const profilesRef = collection(db, 'profiles');
    const userProfileRef = query(profilesRef, where('userId', '==', userId));

    onSnapshot(
      userProfileRef,
      snapshot => {
        setUserProfiles(snapshot.docs.map(doc => ({ ...doc.data() })));
        setSnapshotIsReady(true);
      },
      error => {
        Alert.alert(languageDeterminer(CONTACTS.alert.snapshotError), error, [
          { text: 'Ok' },
        ]);
        setSnapshotIsReady(true);
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>
        {languageDeterminer(EDIT_CONTACTS.title)}
      </Text>

      {!snapshotIsReady ? (
        <Loader />
      ) : userProfiles.length > 0 ? (
        <FlatList
          style={styles.list}
          data={userProfiles}
          keyExtractor={(item, indx) => indx.id}
          renderItem={({ item }) => (
            <View style={styles.itemList}>
              <Text style={[styles.text, styles.name]}>{item.name}</Text>

              <Text style={[styles.text, styles.textContent]}>
                {item.description}
              </Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});
