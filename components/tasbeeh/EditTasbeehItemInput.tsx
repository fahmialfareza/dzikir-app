import React, { useState, useEffect } from "react";
import { Platform, Alert, Keyboard } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TasbeehItemInput from "./TasbeehItemInput";
import TasbeehTarget from "../../models/tasbeehTarget";
import colorData from "../../constants/data/colorData";
import TasbeehTargetActions from "../../redux/actions/TasbeehTargetActions";
import { useAppDispatch } from "../../redux";

interface EditTasbeehItemInputProps {
  editModalVisible: boolean;
  item: TasbeehTarget;
  setEditModalVisible: (visible: boolean) => void;
}

function EditTasbeehItemInput({
  editModalVisible,
  setEditModalVisible,
  item,
}: EditTasbeehItemInputProps) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TasbeehTarget>(item);

  useEffect(() => {
    setState(item);
  }, [item]);

  return (
    <TasbeehItemInput
      modalVisible={editModalVisible}
      setModalVisible={setEditModalVisible}
      actionText={
        <>
          <Ionicons
            name={Platform.OS === "android" ? "md-pencil" : "ios-pencil"}
            color="white"
          />{" "}
          Ubah
        </>
      }
      enableRemoveButton={true}
      onSubmitHandler={async () => {
        dispatch(TasbeehTargetActions.updateTasbeehTarget(state));

        setEditModalVisible(false);
        setState({
          id: 0,
          title: "",
          arabic: "",
          background: colorData[0].color,
          color: "#FFFFFF",
          target: 100,
          counter: 0,
        });

        Alert.alert("Sukses", "Tasbih berhasil diubah");
        Keyboard.dismiss();
      }}
      onDeleteHandler={async () => {
        Alert.alert("Apakah kamu yakin?", "Menghapus data ini", [
          {
            text: "Tidak",
            style: "cancel",
          },
          {
            text: "Ya",
            style: "destructive",
            onPress: async () => {
              dispatch(TasbeehTargetActions.deleteTasbeehTarget(state.id));

              setEditModalVisible(false);
              setState({
                id: 0,
                title: "",
                arabic: "",
                background: colorData[0].color,
                color: "#FFFFFF",
                target: 100,
                counter: 0,
              });

              Alert.alert("Sukses", "Tasbih berhasil dihapus");

              Keyboard.dismiss();
            },
          },
        ]);
      }}
      setState={setState}
      state={state}
      colorDefaultValue={colorData.find(
        (color) => color.color === item.background
      )}
    />
  );
}

export default EditTasbeehItemInput;
