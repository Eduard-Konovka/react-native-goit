import React from 'react';
import { ImageBackground, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Notifications, Contacts, Menu } from './tabs';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: 'rgba(236, 242, 246, 0.5)',
          tabBarStyle: {
            display: 'flex',
            width: 326,
            height: 72,
            backgroundColor: 'rgba(236, 242, 246, 0.24)',
            borderRadius: 14,
            overflow: 'hidden',
          },
        }}
      >
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.userIcon}
                source={require('assets/user.png')}
              />
            ),
          }}
          component={Profile}
        />

        <Tab.Screen
          name="Notifications"
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.notificationsIcon}
                source={require('assets/bell.png')}
              />
            ),
          }}
          component={Notifications}
        />

        <Tab.Screen
          name="Contacts"
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.contactsIcon}
                source={require('assets/contactsBook.png')}
              />
            ),
          }}
          component={Contacts}
        />

        <Tab.Screen
          name="Menu"
          options={{
            tabBarIcon: () => (
              <Image
                style={styles.menuIcon}
                source={require('assets/menu.png')}
              />
            ),
          }}
          component={Menu}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  userIcon: {
    width: 32,
    height: 32,
  },
  notificationsIcon: {
    width: 32,
    height: 32,
  },
  contactsIcon: {
    width: 30,
    height: 28,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});
