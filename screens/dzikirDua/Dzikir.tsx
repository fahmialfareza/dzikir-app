import React, { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  useColorScheme,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import screenMode from "../../constants/screenMode";
import { useAppDispatch } from "../../redux";
import MorningAfternoonDzikirActions from "../../redux/actions/MorningAfternoonDzikirActions";
import { selectMorningAfternoonDzikir } from "../../redux/reducers/morningAfternoonDzikir";
import {
  DailyPrayerActivityButton,
  DzikirDuaImage,
  DzikirDuaTitle,
  EveningDzikirButton,
  MorningDzikirButton,
} from "../../constants/assets";

interface DzikirProps {
  navigation: NavigationProp<any, any>;
}

const Dzikir = ({ navigation }: DzikirProps) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const { morningDzikir, eveningDzikir } = useSelector(
    selectMorningAfternoonDzikir
  );

  useEffect(() => {
    dispatch(MorningAfternoonDzikirActions.getMorningAfternoonDzikir());
  }, []);

  const themeContainerStyle =
    colorScheme === "light"
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const selectMenuHandler = (routeName: string, params: any) => {
    navigation.navigate(routeName, params);
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={[styles.row, styles.imageBanner]}>
        <DzikirDuaImage style={styles.gap} />
        <DzikirDuaTitle style={styles.gap} />
      </View>
      <View style={[styles.row]}>
        <View style={[styles.buttonMenu, styles.gap]}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", false)}
            useForeground={true}
            onPress={() => {
              selectMenuHandler("MorningAfternoonDzikir", {
                title: "Dzikir Pagi",
                data: morningDzikir,
              });
            }}
          >
            <MorningDzikirButton />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", false)}
            useForeground={true}
            onPress={() => {
              selectMenuHandler("MorningAfternoonDzikir", {
                title: "Dzikir Petang",
                data: eveningDzikir,
              });
            }}
          >
            <EveningDzikirButton />
          </TouchableNativeFeedback>
        </View>
        <View style={[styles.buttonMenu, styles.gap]}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", false)}
            useForeground={true}
            onPress={() => {
              selectMenuHandler("EveryDaysDuaHome", {
                title: "Doa Harian",
              });
            }}
          >
            <DailyPrayerActivityButton />
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: "Dzikir & Doa",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  gap: {
    margin: 15,
  },
  imageBanner: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonMenuImage: {
    marginBottom: 4,
  },
});

export default Dzikir;
