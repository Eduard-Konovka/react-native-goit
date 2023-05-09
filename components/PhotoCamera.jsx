import React, { useState, useEffect } from 'react';
import {
  useWindowDimensions,
  ImageBackground,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from 'db';
import Loader from './Loader';
import { CAMERA } from 'constants';

export default function PhotoCamera({ navigation }) {
  const { width } = useWindowDimensions();
  const language = useLanguage();
  const { userId, name } = useSelector(state => state.auth);

  const [hasPermission, setHasPermission] = useState('undetermined');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(status === 'denied');
        Alert.alert(
          languageDeterminer(CAMERA.alert.permissionsError.title),
          languageDeterminer(CAMERA.alert.permissionsError.description),
          [{ text: 'Ok' }],
        );
      }
    })();
  }, []);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const stylesArrowButton = ({ pressed }) => [
    {
      backgroundColor: pressed ? 'rgba(236, 242, 247, 0.5)' : null,
    },
    styles.arrowBtn,
  ];

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePhotoId = Date.now().toString();
    const storageRef = ref(storage, `avatars/${uniquePhotoId}.jpg`);

    await uploadBytes(storageRef, file)
      .then(() =>
        console.log(
          'The photo file has been successfully uploaded to Firebase Storage',
        ),
      )
      .catch(error =>
        Alert.alert(languageDeterminer(CAMERA.alert.uploadError), error, [
          { text: 'Ok' },
        ]),
      );

    return await getDownloadURL(ref(storage, `avatars/${uniquePhotoId}.jpg`));
  };

  const uploadProfileToServer = async () => {
    const avatar = await uploadPhotoToServer();

    try {
      const profilesRef = await addDoc(collection(db, 'profiles'), {
        avatar,
        description,
        userId,
        name,
      });

      console.log('Profile written with ID: ', profilesRef.id);
    } catch (error) {
      Alert.alert(languageDeterminer(CAMERA.alert.addingError), error, [
        { text: 'Ok' },
      ]);
    }
  };

  const sendPhoto = () => {
    uploadProfileToServer();
    navigation.navigate('PhotoLibrary');
  };

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

      {hasPermission === 'undetermined' ? (
        <View style={styles.innerContainer}>
          <Loader title={languageDeterminer(CAMERA.getAccess)} />
        </View>
      ) : hasPermission === 'denied' ? (
        <View style={styles.innerContainer}>
          <Text style={styles.errorTitle}>
            {languageDeterminer(CAMERA.noAccess)}
          </Text>
        </View>
      ) : cameraError ? (
        <View style={styles.innerContainer}>
          <Text style={styles.errorTitle}>
            {`${languageDeterminer(CAMERA.alert.cameraError)}:`}
          </Text>
          <Text style={styles.errorDescr}>{cameraError}</Text>
        </View>
      ) : (
        <>
          <Camera
            style={{
              ...styles.camera,
              width,
              height: width * 1.33,
            }}
            type={cameraType}
            ref={setCameraRef}
            onCameraReady={() => setIsCameraReady(true)}
            onMountError={error => setCameraError(error)}
          >
            {photo && (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            )}

            <Pressable
              style={styles.buttonContainer}
              disabled={!isCameraReady}
              onPress={takePhoto}
            >
              <Text style={styles.btnText}>
                {languageDeterminer(CAMERA.button.snap)}
              </Text>
            </Pressable>
          </Camera>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} onChangeText={setDescription} />
          </View>

          <View style={styles.btnBox}>
            <Pressable
              style={styles.buttonContainer}
              disabled={!isCameraReady}
              onPress={() => {
                setCameraType(
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <Text style={styles.btnText}>
                {languageDeterminer(CAMERA.button.flip)}
              </Text>
            </Pressable>

            {photo && (
              <Pressable
                style={styles.buttonContainer}
                disabled={!isCameraReady}
                onPress={sendPhoto}
              >
                <Text style={styles.btnText}>
                  {languageDeterminer(CAMERA.button.send)}
                </Text>
              </Pressable>
            )}
          </View>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    borderRadius: 14,
    marginTop: 52,
    marginBottom: 20,
    marginLeft: 33,
    marginRight: 'auto',
  },
  errorTitle: {
    fontSize: 22,
    color: '#FF4545',
  },
  errorDescr: {
    fontSize: 18,
    color: '#FFAAAA',
  },
  camera: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  photoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
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
  btnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(236, 242, 247, 0.12)',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: 'transparent',
    borderBottomColor: '#20b2aa',
    color: '#FFFFFF',
  },
});
