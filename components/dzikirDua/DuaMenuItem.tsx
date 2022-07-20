import React from "react";
import {
  TouchableOpacity,
  View,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import EveryDaysDua from "../../models/everyDaysDua";

export interface DuaMenuItemProp {
  onPress?: () => void;
  item: EveryDaysDua;
}

function DuaMenuItem({ onPress, item }: DuaMenuItemProp) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={Platform.OS === "android" ? "md-book" : "ios-book"}
          color="#26C6DA"
          size={24}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text} adjustsFontSizeToFit={true}>
          {item.dua}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    height: 64,
    alignItems: "center",
    borderRadius: 4,
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: "#E3F8FA",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  textContainer: { flexDirection: "row", flexShrink: 1 },
  text: {
    flexShrink: 1,
    fontFamily: "dubai-bold",
  },
});

export default DuaMenuItem;
