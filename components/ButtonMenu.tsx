import React from 'react';
import {
  TouchableOpacity,
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
  children?: React.ReactNode;
}

function ButtonMenu({
  onPress,
  backgroundColor,
  color,
  text,
  children,
}: ButtonMenuProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonMenuItem, backgroundColor }}
      onPress={onPress}
    >
      <View style={styles.buttonMenuView}>
        {children}
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
