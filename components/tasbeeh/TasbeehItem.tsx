import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";

import TasbeehTarget from "../../models/tasbeehTarget";

import TasbeehTargetActions from "../../redux/actions/TasbeehTargetActions";
import { useAppDispatch } from "../../redux";

export interface TasbeehItemProps {
  item: TasbeehTarget;
  onPress?: () => void;
  onEditPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  showKebabMenu?: boolean;
}

const TasbeehItem = ({
  item,
  onPress,
  onEditPress,
  backgroundColor,
  textColor,
  showKebabMenu,
}: TasbeehItemProps) => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [editPressed, setEditPressed] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  useEffect(() => {
    if (!visible && editPressed) {
      if (onEditPress) {
        setTimeout(() => {
          onEditPress();
        }, 500);

        setEditPressed(false);
      }
    }
  }, [editPressed, visible]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <View style={{ flex: 6, alignItems: "flex-start" }}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      </View>
      <View style={{ flex: 6, alignItems: "flex-end" }}>
        <Text style={[styles.arabicTitle, { color: textColor }]}>
          {item.arabic}
        </Text>
      </View>

      {showKebabMenu && (
        <>
          <View style={styles.kebabMenuContainer}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
              color="white"
              onPress={showMenu}
            />
          </View>

          <Menu visible={visible} onRequestClose={hideMenu}>
            <MenuItem
              onPress={() => {
                hideMenu();
                setEditPressed(true);
              }}
            >
              <FontAwesome name="pencil-square-o" size={14} />{" "}
              <Text style={styles.kebabMenuText}>Edit Tasbih</Text>
            </MenuItem>
            <MenuItem
              onPress={() => {
                hideMenu();
                Alert.alert("Apakah kamu yakin?", "Menghapus data ini", [
                  {
                    text: "Tidak",
                    style: "cancel",
                  },
                  {
                    text: "Ya",
                    style: "destructive",
                    onPress: async () => {
                      dispatch(
                        TasbeehTargetActions.deleteTasbeehTarget(item.id)
                      );

                      setVisible(false);

                      Alert.alert("Sukses", "Tasbih berhasil dihapus");
                    },
                  },
                ]);
              }}
            >
              <Ionicons
                name={Platform.OS == "android" ? "md-trash" : "ios-trash"}
                size={14}
              />{" "}
              <Text style={styles.kebabMenuText}>Hapus Tasbih</Text>
            </MenuItem>
          </Menu>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "dubai-regular",
  },
  arabicTitle: {
    fontSize: 24,
    fontFamily: "al-qalam",
  },
  kebabMenuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 8,
  },
  kebabMenuText: { fontFamily: "dubai-regular" },
});

export default TasbeehItem;
