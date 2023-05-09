import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const bleManager = new BleManager();

function useBLE() {
  const [allDevices, setAllDevices] = useState([]);

  const requestPermissions = async cb => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth Low Energy requires Location',
          buttonNeutral: 'Ask Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
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
      if (error.message === 'Cannot start scanning operation') {
        setAllDevices([{ name: 'No bluetooth peripherals found' }]);
      } else if (error) {
        setAllDevices([
          { name: `Error of startDeviceScan:\n${error.message}` },
        ]);
        console.log('Error of startDeviceScan: ', JSON.stringify(error));
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

  return {
    requestPermissions,
    scanForDevices,
    allDevices,
  };
}

export default useBLE;
