import React, { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  Platform,
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
import TouchableRipple from "../../components/TouchableRipple";

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

  const width = Dimensions.get("screen").width / 1.1;
  const gap = Platform.OS === "android" ? [] : [styles.gapHorizontal];

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={[styles.row, styles.imageBanner]}>
        <DzikirDuaImage style={styles.gapVertical} />
        <DzikirDuaTitle style={styles.gapVertical} />
      </View>
      <View style={[styles.row]}>
        <View style={gap}>
          <View style={[styles.buttonMenu, styles.gap]}>
            <TouchableRipple
              onPress={() => {
                selectMenuHandler("MorningAfternoonDzikir", {
                  title: "Dzikir Pagi",
                  data: morningDzikir,
                });
              }}
            >
              {Platform.OS === "android" ? (
                <MorningDzikirButton width={width / 2.2} />
              ) : (
                <MorningDzikirButton />
              )}
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                selectMenuHandler("MorningAfternoonDzikir", {
                  title: "Dzikir Petang",
                  data: eveningDzikir,
                });
              }}
            >
              {Platform.OS === "android" ? (
                <EveningDzikirButton width={width / 2.2} />
              ) : (
                <EveningDzikirButton />
              )}
            </TouchableRipple>
          </View>
          <View style={[styles.buttonMenu, styles.gap]}>
            <TouchableRipple
              onPress={() => {
                selectMenuHandler("EveryDaysDuaHome", {
                  title: "Doa Harian",
                });
              }}
            >
              {Platform.OS === "android" ? (
                <DailyPrayerActivityButton width={"100%"} />
              ) : (
                <DailyPrayerActivityButton />
              )}
            </TouchableRipple>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: "Dzikir & Doa",
};

const styles = StyleSheet.create({
  debug: {
    borderWidth: 1,
    borderColor: "red",
  },
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  gapVertical: {
    marginVertical: Dimensions.get("screen").width / 30,
  },
  gapHorizontal: {
    marginHorizontal: Dimensions.get("screen").width / 4.84,
  },
  gap: {
    marginHorizontal: Dimensions.get("screen").width / 15,
    marginVertical: Dimensions.get("screen").width / 50,
  },
  imageBanner: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Dzikir;
