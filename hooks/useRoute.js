import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationScreen, LoginScreen, MainScreen } from 'screens';
import { PhotoLibrary, PhotoCamera } from 'components';

const Stack = createNativeStackNavigator();

export default function useRoute(isAuth) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} />
          <Stack.Screen name="PhotoCamera" component={PhotoCamera} />
        </>
      )}
    </Stack.Navigator>
  );
}
