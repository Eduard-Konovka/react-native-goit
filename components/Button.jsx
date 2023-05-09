import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Button({ text, inactive, style, handlePress }) {
  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed
              ? ['rgba(236, 242, 247, 0.5)', 'rgba(236, 242, 247, 0.5)']
              : inactive
              ? ['rgba(236, 242, 247, 0.24)', 'rgba(236, 242, 247, 0.24)']
              : ['#07E1CC', '#008BAE']
          }
          start={{ x: 0, y: 0.3 }}
          style={[styles.btn, style]}
        >
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 326,
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontFamily: 'medium500',
    fontSize: 23,
    lineHeight: 29,
    letterSpacing: -0.23,
    textAlign: 'center',
    color: '#EEFBFF',
  },
});
