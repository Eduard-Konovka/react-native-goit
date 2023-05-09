import React from 'react';
import openMap from 'react-native-open-maps';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { Map, Button } from 'components';
import { NOTIFICATIONS } from 'constants';

export default function Notifications({ route }) {
  const language = useLanguage();

  const languageDeterminer = obj => languageWrapper(language, obj);

  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>
        {languageDeterminer(NOTIFICATIONS.title)}
      </Text>

      {route.params && (
        <>
          <Map
            latitude={route.params.latitude}
            longitude={route.params.longitude}
            zoom={route.params.zoom}
            marker={{
              title: languageDeterminer(NOTIFICATIONS.marker.title),
              description: languageDeterminer(NOTIFICATIONS.marker.description),
            }}
          />

          <Button
            text={languageDeterminer(NOTIFICATIONS.button)}
            style={{ marginTop: 40 }}
            handlePress={() =>
              openMap({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
              })
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
