import React, { useState, useEffect } from 'react';
import { LogBox, View, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { store } from 'redux';
import { CountryProvider, LanguageProvider, ServicesProvider } from 'context';
import { languageWrapper } from 'middlewares';
import { ALERT } from 'constants';
import { StartRouter, MainRouter } from 'routers';
import { Loader } from 'components';
import { globalStyles } from 'styles/style';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

export default function App() {
  const [fontIsReady, setFontIsReady] = useState(false);
  const [firstDownloadIsReady, setFirstDownloadIsReady] = useState(false);
  const [isFirstDownload, setIsFirstDownload] = useState(false);
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState(null);
  const [services, setServices] = useState({});

  const languageDeterminer = obj => languageWrapper(language, obj);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          regular400: require('assets/fonts/Montserrat-Regular.ttf'),
          medium500: require('assets/fonts/Montserrat-Medium.ttf'),
          semiBold600: require('assets/fonts/Montserrat-SemiBold.ttf'),
        });
      } catch (error) {
        Alert.alert(languageDeterminer(ALERT.errorFont), error, [
          { text: 'Ok' },
        ]);
      } finally {
        setFontIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function getFirstDownload() {
      try {
        const value = await AsyncStorage.getItem('isFirstDownload');
        setIsFirstDownload(value === 'false' ? false : true);
      } catch (error) {
        Alert.alert(languageDeterminer(ALERT.errorGetFirstDownload), error, [
          { text: 'Ok' },
        ]);
      } finally {
        setFirstDownloadIsReady(true);
      }
    }

    getFirstDownload();
  }, []);

  useEffect(() => {
    async function getLanguage() {
      try {
        const language = await AsyncStorage.getItem('language');
        !isFirstDownload && setLanguage(language != null ? language : null);
      } catch (error) {
        Alert.alert(languageDeterminer(ALERT.errorGetLanguage), error, [
          { text: 'Ok' },
        ]);
      }
    }

    getLanguage();
  }, [isFirstDownload]);

  async function storeFirstDownload(value) {
    try {
      await AsyncStorage.setItem('isFirstDownload', value.toString());
    } catch (error) {
      Alert.alert(languageDeterminer(ALERT.errorStoreFirstDownload), error, [
        { text: 'Ok' },
      ]);
    }
  }

  async function storeLanguage(value) {
    try {
      await AsyncStorage.setItem('language', value);
    } catch (error) {
      Alert.alert(languageDeterminer(ALERT.errorStoreLanguage), error, [
        { text: 'Ok' },
      ]);
    }
  }

  function handleLanguage(language) {
    setLanguage(language);
    storeLanguage(language);
  }

  function handleFinish() {
    setIsFirstDownload(false);
    storeFirstDownload(false);
  }

  return (
    <View style={globalStyles.main}>
      {fontIsReady && firstDownloadIsReady ? (
        <Provider store={store}>
          <CountryProvider value={country}>
            <LanguageProvider value={language}>
              <ServicesProvider value={services}>
                {isFirstDownload ? (
                  <StartRouter
                    setCountry={setCountry}
                    setLanguage={handleLanguage}
                    setServices={setServices}
                    onFinish={handleFinish}
                  />
                ) : (
                  <MainRouter />
                )}
              </ServicesProvider>
            </LanguageProvider>
          </CountryProvider>
        </Provider>
      ) : (
        <ImageBackground
          source={require('assets/background/1.jpg')}
          resizeMode="cover"
          style={globalStyles.bgImage}
        >
          <Loader />
        </ImageBackground>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
