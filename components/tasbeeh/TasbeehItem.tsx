import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import TasbeehTarget from '../../models/tasbeehTarget';

export interface TasbeehItemProps {
  item: TasbeehTarget;
  onPress?: () => void;
  onLongPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const TasbeehItem = ({
  item,
  onPress,
  onLongPress,
  backgroundColor,
  textColor,
}: TasbeehItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </View>
    <View>
      <Text style={[styles.title, { color: textColor }]}>{item.arabic}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'dubai-regular',
  },
});

export default TasbeehItem;
