import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

interface ButtonMenuProps {
  onPress?: () => void;
  backgroundColor: string;
  color: string;
  text: string;
  imageSource: any;
}

function ButtonMenu({
  onPress,
  backgroundColor,
  color,
  text,
  imageSource,
}: ButtonMenuProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonMenuItem, backgroundColor }}
      onPress={onPress}
    >
      <View style={styles.buttonMenuView}>
        <Image source={imageSource} style={styles.buttonMenuImage}></Image>
        <Text style={{ ...styles.buttonMenuText, color }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonMenuItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  buttonMenuImage: {
    width: Dimensions.get('window').width / 6,
    marginBottom: 4,
  },
  buttonMenuView: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 4,
  },
  buttonMenuText: {
    fontSize: Dimensions.get('window').width / 20,
  },
});

export default ButtonMenu;
