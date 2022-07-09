import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Dialog from "react-native-dialog";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import DzikirTarget from "../../models/dzikirTarget";

import { DzikirCounterBackgrondImage } from "../../constants/assets";
import screenMode from "../../constants/screenMode";

import TasbihCounter from "../../components/TasbihCounter";

import { RootState } from "../../redux";
import { updateDzikirTarget } from "../../redux/actions/dzikirTarget";

interface DzikirCounterProps {
  route: RouteProp<{ params: { item: DzikirTarget } }, "params">;
  updateDzikirTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string,
    counter: number
  ) => void;
}

interface DispatchProps {
  updateDzikirTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string,
    counter: number
  ) => void;
}

function DzikirCounter({
  route: { params, name },
  updateDzikirTarget,
}: DzikirCounterProps) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState("0000");
  const [addColor, setAddColor] = useState("#FCDDEC");
  const [resetColor, setResetColor] = useState("#FCDDEC");
  const [visible, setVisible] = useState(false);
  const [visibleResetDialog, setvisibleResetDialog] = useState(false);

  // State value of dzikir
  const [oldTarget, setOldTarget] = useState(String(params.item.target));
  const [target, setTarget] = useState(String(params.item.target));

  const themeContainerStyle =
    colorScheme === "light"
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const updateDzikir = async () => {
    await updateDzikirTarget(
      params.item.id,
      params.item.title,
      parseInt(target),
      params.item.arabic || "",
      params.item.background || "",
      params.item.color || "",
      parseInt(count)
    );
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSaveTarget = () => {
    setTarget(target);
    submitTargetHandler();
    setVisible(false);
  };

  const resetDialog = () => {
    if (count === "0000") {
      setvisibleResetDialog(false);
    } else {
      setvisibleResetDialog(true);
    }
  };

  const handleCancelResetDialog = () => {
    setvisibleResetDialog(false);
  };

  const counterFormatter = (countNumber: number) => {
    let result = countNumber.toString();

    if (countNumber < 10) {
      result = `000${countNumber}`;
    } else if (countNumber < 100) {
      result = `00${countNumber}`;
    } else if (countNumber < 1000) {
      result = `0${countNumber}`;
    }

    return result;
  };

  const addCounterHandler = async () => {
    // Set color
    setAddColor(themeContainerStyle.backgroundColor);

    const countNumber = parseInt(count) + 1;
    let result = counterFormatter(countNumber);

    setTimeout(() => {
      setAddColor("#FCDDEC");
    }, 100);

    setCount(result);
  };

  const resetCounterHandler = async () => {
    // Set color
    setResetColor(themeContainerStyle.backgroundColor);

    setTimeout(() => {
      setResetColor("#FCDDEC");
    }, 100);

    setCount("0000");
    setvisibleResetDialog(false);
  };

  const targetChangeTextHandler = (text: string) => {
    if (text === "") {
      setTarget("0");
      return;
    }

    if (target === "0") {
      setTarget(text.split("0").join(""));
      return;
    }

    setTarget(text);
  };

  const submitTargetHandler = async () => {
    try {
      if (target !== "0") {
        if (target === oldTarget) {
          return;
        }

        await updateDzikir();

        setOldTarget(target);

        Alert.alert("Berhasil Mengganti Target", `Target menjadi ${target}`, [
          { text: "OK", onPress: () => console.log("Target OK") },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCount(counterFormatter(params.item.counter));
  }, [params.item.counter]);

  useEffect(() => {
    if (target !== "0") {
      if (parseInt(count) === parseInt(target)) {
        Alert.alert("Alhamdullah!", "Kamu telah mencapai target dzikir", [
          { text: "OK", onPress: async () => console.log("Target OK") },
        ]);
        successAudio();
      }
    }
  }, [count, target]);

  useEffect(() => {
    updateDzikir();
  }, [count]);

  const successAudio = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("../../assets/sounds/success.wav"));
      await sound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      // await sound.unloadAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  };

  return (
    <>
      <DzikirCounterBackgrondImage
        style={{
          ...styles.backgroundImage,
          top: -(1.5 * insets.top + 1.5 * insets.bottom),
        }}
        width={Dimensions.get("window").width}
        height={
          Dimensions.get("window").height +
          1.5 * insets.top +
          1.5 * insets.bottom
        }
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.arabicText}>{params.item.arabic}</Text>
          <Text style={styles.dzikirText}>{params.item.title}</Text>
          <View style={styles.targetView}>
            <View>
              <Text style={styles.inputText}>Target :</Text>
            </View>
            <View>
              <Dialog.Container visible={visible}>
                <Dialog.Title>Masukan Target</Dialog.Title>
                <Dialog.Input
                  onChangeText={targetChangeTextHandler}
                  keyboardType="number-pad"
                  returnKeyType={"done"}
                  style={styles.dialogInput}
                >
                  {target}
                </Dialog.Input>
                <Dialog.Button
                  style={styles.saveTarget}
                  label="Simpan"
                  onPress={handleSaveTarget}
                />
                <Dialog.Button label="Batal" onPress={handleCancel} />
              </Dialog.Container>
            </View>
            <View>
              <Text style={styles.targetText}>{String(target)}</Text>
            </View>
            <View style={styles.editButton}>
              <FontAwesome
                name="pencil-square"
                size={32}
                color="white"
                onPress={showDialog}
              />
            </View>
          </View>
        </View>

        <View style={styles.tasbihView}>
          <TasbihCounter
            count={count}
            addColor={addColor}
            resetColor={parseInt(count) > 0 ? "#FABF39" : resetColor}
            addCounterHandler={addCounterHandler}
            resetCounterHandler={resetDialog}
          />
        </View>
        <View>
          <Dialog.Container visible={visibleResetDialog}>
            <Dialog.Title>Reset Hitungan</Dialog.Title>
            <Dialog.Description>
              Apakah anda ingin mereset hitungan yang sudah berjalan?
            </Dialog.Description>
            <Dialog.Button
              label="Reset"
              style={styles.resetCounter}
              onPress={resetCounterHandler}
            />
            <Dialog.Button label="Batal" onPress={handleCancelResetDialog} />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    </>
  );
}

export const screenOptions = {
  headerTitle: "Dzikir Counter",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    marginTop: 3,
    marginLeft: 10,
  },
  textView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 40,
  },
  arabicText: {
    fontFamily: "dubai-regular",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 64,
    color: "#FFFFFF",
  },
  dzikirText: {
    fontFamily: "dubai-regular",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 32,
    color: "#FFFFFF",
  },
  targetText: {
    marginTop: 2,
    fontSize: 24,
    fontFamily: "dubai-regular",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10,
    color: "#FFFFFF",
  },
  saveTarget: {
    fontSize: 20,
    color: "#FFFFFF",
    backgroundColor: "#00BFFF",
    width: "100%",
    borderRadius: 10,
  },
  resetCounter: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: "#FFFFFF",
    backgroundColor: "#FF4444",
    width: "100%",
    borderRadius: 10,
  },
  dialogInput: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "dubai-regular",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10,
  },
  inputText: {
    fontSize: 24,
    fontFamily: "dubai-regular",
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10,
    color: "#FFFFFF",
  },
  targetInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 6,
    margin: 2,
    width: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "ds-digit",
    color: "#3D3FB8",
  },
  targetView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backgroundImage: {
    position: "absolute",
    zIndex: -9999,
    resizeMode: "cover",
  },
  tasbihView: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const mapStateToProps = (state: RootState) => ({
  dzikirTarget: state.dzikirTarget,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    updateDzikirTarget: async (
      id: number,
      title: string,
      target: number,
      arabic: string,
      background: string,
      color: string,
      counter: number
    ) => {
      await dispatch(
        updateDzikirTarget(
          id,
          title,
          target,
          arabic,
          background,
          color,
          counter
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DzikirCounter);
