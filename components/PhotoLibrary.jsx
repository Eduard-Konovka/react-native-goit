import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'db';
import Loader from './Loader';
import { PHOTO_LIBRARY } from 'constants';

export default function PhotoLibrary({ navigation }) {
  const language = useLanguage();

  const [snapshotIsReady, setSnapshotIsReady] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  useEffect(() => {
    onSnapshot(
      collection(db, 'profiles'),
      snapshot => {
        setProfiles(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setSnapshotIsReady(true);
      },
      error => {
        Alert.alert(languageDeterminer(CAMERA.alert.snapshotError), error, [
          { text: 'Ok' },
        ]);
        setSnapshotIsReady(true);
      },
    );
  }, []);

  const stylesArrowButton = ({ pressed }) => [
    {
      backgroundColor: pressed ? 'rgba(236, 242, 247, 0.5)' : null,
    },
    styles.arrowBtn,
  ];

  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <Pressable
        style={stylesArrowButton}
        onPressOut={() => navigation.navigate('Menu')}
      >
        <Image source={require('assets/arrow.png')} />
      </Pressable>

      <Text style={styles.titleScreen}>
        {languageDeterminer(PHOTO_LIBRARY.title)}
      </Text>

      {!snapshotIsReady ? (
        <Loader />
      ) : profiles.length > 0 ? (
        <FlatList
          style={styles.list}
          data={profiles}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image source={{ uri: item.avatar }} style={styles.photo} />

              <Text style={[styles.text, styles.description]}>
                {item.description}
              </Text>

              <Text
                style={[styles.text, styles.link]}
                onPress={() =>
                  navigation.navigate('Contacts', { profileId: item.id })
                }
              >
                {languageDeterminer(PHOTO_LIBRARY.button)}
              </Text>
            </View>
          )}
        />
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  arrowBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    borderRadius: 14,
    marginTop: 52,
    marginBottom: 10,
    marginLeft: 33,
    marginRight: 'auto',
  },
  titleScreen: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: '#EEFBFF',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 300,
    height: 300,
    borderRadius: 14,
  },
  text: {
    fontFamily: 'regular400',
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    color: '#EEFBFF',
    marginTop: 10,
  },
  link: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(236, 242, 247, 0.15)',
    color: '#20B2AA',
    borderRadius: 14,
  },
});
