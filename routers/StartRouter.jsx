import React, { useState } from 'react';
import { useCountry, useLanguage } from 'context';
import {
  CoverScreen,
  WelcomeScreen,
  CountryScreen,
  LanguageScreen,
  CheckSelectedOptionScreen,
  PrivacyPolicyScreen,
  AppSetUpScreen,
} from 'screens';
import { Loader } from 'components';

export default function StartRouter({
  setCountry,
  setLanguage,
  setServices,
  onFinish,
}) {
  const country = useCountry();
  const language = useLanguage();

  const [screensFlags, setScreensFlags] = useState({ cover: true });

  const changeScreensFlags = (remove, install) => {
    const obj = { ...screensFlags };
    obj[remove] = false;
    obj[install] = true;
    setScreensFlags(obj);
  };

  return screensFlags.cover ? (
    <CoverScreen onFinal={() => changeScreensFlags('cover', 'welcome')} />
  ) : screensFlags.welcome ? (
    <WelcomeScreen onPress={() => changeScreensFlags('welcome', 'country')} />
  ) : screensFlags.country ? (
    <CountryScreen
      onPress={country => {
        setCountry(country);
        changeScreensFlags(
          'country',
          !language ? 'language' : 'checkSelectedOption',
        );
      }}
    />
  ) : screensFlags.language ? (
    <LanguageScreen
      onPress={language => {
        setLanguage(language);
        changeScreensFlags('language', 'checkSelectedOption');
      }}
    />
  ) : screensFlags.checkSelectedOption ? (
    <CheckSelectedOptionScreen
      country={country}
      language={language}
      onEditCountry={() => changeScreensFlags('checkSelectedOption', 'country')}
      onEditLanguage={() =>
        changeScreensFlags('checkSelectedOption', 'language')
      }
      onPress={() => changeScreensFlags('checkSelectedOption', 'privacyPolicy')}
    />
  ) : screensFlags.privacyPolicy ? (
    <PrivacyPolicyScreen
      language={language}
      onPress={() => changeScreensFlags('privacyPolicy', 'appSetUp')}
    />
  ) : screensFlags.appSetUp ? (
    <AppSetUpScreen
      language={language}
      onPress={obj => {
        setServices(obj);
        onFinish();
      }}
    />
  ) : (
    <Loader />
  );
}
