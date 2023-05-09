import React from 'react';
import {
  FlatList,
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

export default function RadioButton({ items, checked, style, onPress }) {
  return (
    <FlatList
      data={items}
      style={style}
      renderItem={({ item }) => (
        <Pressable
          key={item.key}
          onPress={() => onPress(item.key)}
          style={[
            styles.item,
            item.first && styles.itemFirst,
            item.last && styles.itemLast,
            checked === item.key && styles.activeItem,
          ]}
        >
          <View style={styles.radioCircle}>
            {checked === item.key && (
              <Image
                source={require('assets/activeDot.png')}
                style={styles.selectedRadioCircle}
              />
            )}
          </View>

          <Text style={styles.radioText}>{item.text}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  itemLast: {
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  activeItem: {
    backgroundColor: '#ECF2F650',
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EEFBFF',
    marginLeft: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#93A8B7',
  },
  selectedRadioCircle: {
    width: 8,
    height: 8,
  },
  radioText: {
    marginLeft: 42,
    fontFamily: 'regular400',
    fontSize: 16,
    lineHeight: 20.35,
    letterSpacing: -0.16,
    color: '#EEFBFF',
  },
});
