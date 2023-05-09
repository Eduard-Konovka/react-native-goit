import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { Button } from 'components';

export default function CheckSelectedOptionScreen({
  country,
  language,
  onEditCountry,
  onEditLanguage,
  onPress,
}) {
  const [pressEditCountry, setPressEditCountry] = useState([
    styles.formItem,
    styles.formItemFirst,
  ]);
  const [pressEditLanguage, setPressEditLanguage] = useState([
    styles.formItem,
    styles.formItemLast,
  ]);

  return (
    <ImageBackground
      source={require('assets/background/1.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Text style={styles.title}>
        You have selected your country and language
      </Text>

      <Text style={styles.subtitle}>Check before continuing:</Text>

      <View style={styles.form}>
        <Pressable
          style={pressEditCountry}
          onPressIn={() =>
            setPressEditCountry([
              styles.formItem,
              styles.formItemFirst,
              styles.activeFormItem,
            ])
          }
          onPressOut={() => {
            setPressEditCountry([styles.formItem, styles.formItemFirst]);
            onEditCountry();
          }}
        >
          <Text style={styles.label}>Country</Text>

          <Text style={styles.input}>{country}</Text>

          <View style={styles.iconBox}>
            <Image source={require('assets/edit.png')} style={styles.icon} />
          </View>
        </Pressable>

        <Pressable
          style={pressEditLanguage}
          onPressIn={() =>
            setPressEditLanguage([
              styles.formItem,
              styles.formItemLast,
              styles.activeFormItem,
            ])
          }
          onPressOut={() => {
            setPressEditLanguage([styles.formItem, styles.formItemLast]);
            onEditLanguage();
          }}
        >
          <Text style={styles.label}>Language</Text>

          <Text style={styles.input}>{language}</Text>

          <View style={styles.iconBox}>
            <Image source={require('assets/edit.png')} style={styles.icon} />
          </View>
        </Pressable>
      </View>

      <Button text="Accept" style={{ marginTop: 40 }} handlePress={onPress} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    width: 326,
    marginTop: 132,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29.25,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#d9d9d9',
  },
  subtitle: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20.35,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
  form: {
    width: 326,
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#ecf2f624',
    borderRadius: 14,
  },
  formItem: {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  formItemFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  formItemLast: {
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  activeFormItem: {
    backgroundColor: '#ECF2F650',
  },
  label: {
    width: 90,
    marginLeft: 24,
    fontFamily: 'semiBold600',
    fontSize: 16,
    lineHeight: 20.35,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
  input: {
    width: 110,
    marginLeft: 24,
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20.35,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
  iconBox: {
    width: 32,
    height: 32,
    marginLeft: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
