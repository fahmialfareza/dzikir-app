import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DzikirDuaIcon } from "../../constants/assets";

interface HeaderDzikirDuaProps {
  title: string;
}

const HeaderDzikirDua = ({ title }: HeaderDzikirDuaProps) => (
  <View style={[styles.item, { backgroundColor: "#3D3FB8" }]}>
    <View style={styles.iconStyle}>
      <DzikirDuaIcon width={24} height={24} />
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 8,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
  iconStyle: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "dubai-regular",
    color: "#FFFFFF",
  },
});

export default HeaderDzikirDua;
