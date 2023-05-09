import React, { useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { useLanguage } from 'context';
import { languageWrapper } from 'middlewares';
import { BLE } from 'constants';
import Button from '../Button';

export default function BluetoothLowEnergy() {
  const bleManager = new BleManager();
  const language = useLanguage();

  const [allDevices, setAllDevices] = useState([]);

  const languageDeterminer = obj => languageWrapper(language, obj);

  const requestPermissions = async cb => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: languageDeterminer(BLE.permissions.title),
          message: languageDeterminer(BLE.permissions.message),
          buttonNeutral: languageDeterminer(BLE.permissions.button.neutral),
          buttonNegative: languageDeterminer(BLE.permissions.button.negative),
          buttonPositive: languageDeterminer(BLE.permissions.button.positive),
        },
      );
      cb(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      cb(true);
    }
  };

  const isDuplicteDevice = (devices, nextDevice) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setAllDevices([
          {
            name: `${languageDeterminer(BLE.errorDeviceScan)}\n${
              error.message
            }`,
          },
        ]);
      }

      if (device) {
        // if (device && device.name?.includes('NameDevice')) {
        setAllDevices(allDevices => {
          if (!isDuplicteDevice(allDevices, device)) {
            return [...allDevices, device];
          }

          return allDevices;
        });
      }
    });
  };

  const openModal = async () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevices();
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{languageDeterminer(BLE.title)}</Text>

        {allDevices.map(device => (
          <Text style={styles.deviceText} key={device.name}>
            {device.name}
          </Text>
        ))}
      </View>

      <Button
        text={languageDeterminer(BLE.button.connect)}
        style={{ marginTop: 40 }}
        handlePress={openModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#FFFFFF',
  },
  deviceText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
    color: '#00FFFF',
  },
});
