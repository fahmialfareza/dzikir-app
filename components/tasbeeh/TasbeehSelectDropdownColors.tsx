import React from "react";
import { View, StyleSheet, Text, useColorScheme } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import screenMode from "../../constants/screenMode";

interface TasbeehSelectDropdownData {
  name: string;
  color: string;
}

interface TasbeehSeelectDropdownProps {
  data: TasbeehSelectDropdownData[];
  onSelect: (selectedItem: TasbeehSelectDropdownData, index: number) => void;
  reference: React.LegacyRef<SelectDropdown>;
  buttonTextAfterSelection: (
    selectedItem: TasbeehSelectDropdownData,
    index: number
  ) => string;
  rowTextForSelection: (
    item: TasbeehSelectDropdownData,
    index: number
  ) => string;
  renderCustomizedRowChild?: (
    selectedItem: TasbeehSelectDropdownData,
    index: number
  ) => React.ReactNode;
  renderCustomizedButtonChild?: (
    item: TasbeehSelectDropdownData,
    index: number
  ) => React.ReactNode;
  label: string;
  defaultValue: TasbeehSelectDropdownData;
}

function TasbeehSelectDropdownColors({
  data,
  onSelect,
  reference,
  buttonTextAfterSelection,
  rowTextForSelection,
  renderCustomizedRowChild,
  renderCustomizedButtonChild,
  label,
  defaultValue,
}: TasbeehSeelectDropdownProps) {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light"
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  return (
    <View style={styles.container}>
      <View style={styles.labelInput}>
        <Text style={[styles.modalText, themeTextStyle]}>{label}</Text>
      </View>
      <View style={styles.selectDropdownInput}>
        <SelectDropdown
          buttonStyle={styles.dropdownButtonStyle}
          buttonTextStyle={styles.dropdownButtonTextStyle}
          dropdownStyle={styles.dropdownButtonStyle}
          data={data}
          onSelect={onSelect}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
          renderCustomizedRowChild={renderCustomizedRowChild}
          defaultValue={defaultValue}
          renderCustomizedButtonChild={renderCustomizedButtonChild}
          ref={reference}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  labelInput: {
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-start",
  },
  modalText: {
    textAlign: "center",
  },
  dropdownButtonStyle: {
    borderWidth: 1,
    borderColor: "#777",
    margin: 2,
    width: "97%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  dropdownButtonTextStyle: {
    fontFamily: "dubai-regular",
    textAlign: "center",
  },
  selectDropdownInput: { flex: 1 },
});

export default TasbeehSelectDropdownColors;
