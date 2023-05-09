import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ latitude, longitude, zoom = 10, marker }) {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType="standard"
      minZoomLevel={zoom}
      onMapReady={() => console.log('Map is ready')}
      onRegionChange={() => console.log('Region change')}
    >
      <Marker
        title={marker.title}
        description={marker.description}
        coordinate={{ latitude, longitude }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 0.9,
    marginTop: '5%',
  },
});
