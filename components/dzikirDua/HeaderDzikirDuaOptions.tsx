import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Checkbox from "expo-checkbox";

import screenMode from "../../constants/screenMode";

export interface HeaderDzikirDuaState {
  arabic: boolean;
  latin: boolean;
  meaning: boolean;
}

interface HeaderDzikirDuaOptionsProps {
  state: HeaderDzikirDuaState;
  setState(state: HeaderDzikirDuaState): void;
}

const HeaderDzikirDuaOptions = ({
  state,
  setState,
}: HeaderDzikirDuaOptionsProps) => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light"
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const themeTextStyle =
    colorScheme === "light"
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  const borderColor =
    colorScheme === "light" ? "#26A2B3" : themeTextStyle.color;

  const itemBorderColor = colorScheme === "light" ? "#F1F1F1" : "#1F1F1F";

  return (
    <View
      style={{
        ...styles.item,
        ...themeContainerStyle,
        borderColor: itemBorderColor,
      }}
    >
      <View style={styles.row}>
        <View style={styles.checkboxView}>
          <Checkbox
            style={{ ...styles.checkbox, borderColor }}
            value={state.arabic}
            onValueChange={() => setState({ ...state, arabic: !state.arabic })}
            color={state.arabic ? "#26A2B3" : undefined}
          />
          <Text style={[styles.paragraph, themeTextStyle]}>Arabic</Text>
        </View>

        <View style={styles.checkboxView}>
          <Checkbox
            style={{ ...styles.checkbox, borderColor }}
            value={state.latin}
            onValueChange={() => setState({ ...state, latin: !state.latin })}
            color={state.latin ? "#26A2B3" : undefined}
          />
          <Text style={[styles.paragraph, themeTextStyle]}>Latin</Text>
        </View>

        <View style={styles.checkboxView}>
          <Checkbox
            style={{ ...styles.checkbox, borderColor }}
            value={state.meaning}
            onValueChange={() =>
              setState({ ...state, meaning: !state.meaning })
            }
            color={state.meaning ? "#26A2B3" : undefined}
          />
          <Text style={[styles.paragraph, themeTextStyle]}>Arti</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    marginTop: 16,
    marginBottom: 20,
    marginHorizontal: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
  },
  title: {
    fontSize: 24,
    fontFamily: "dubai-regular",
  },
  paragraph: {
    fontSize: 16,
    fontFamily: "dubai-regular",
  },
  checkbox: {
    margin: 8,
    borderColor: "#26A2B3",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  checkboxView: { flexDirection: "row", alignItems: "center" },
});

export default HeaderDzikirDuaOptions;
