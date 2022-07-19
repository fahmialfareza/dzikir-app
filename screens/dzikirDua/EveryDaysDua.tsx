import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  SafeAreaView,
  ColorSchemeName,
  Platform,
  useColorScheme,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";

import screenMode from "../../constants/screenMode";

import DuaMenuItem, {
  DuaMenuItemProp,
} from "../../components/dzikirDua/DuaMenuItem";

import EveryDaysDuaActions from "../../redux/actions/EveryDaysDuaActions";
import { selectEveryDaysDua } from "../../redux/reducers/everyDaysDua";
import { useAppDispatch } from "../../redux";

function EveryDaysDua() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "40%"], []);

  const { everyDaysDua } = useSelector(selectEveryDaysDua);

  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [isBefore, setIsBefore] = useState(false);
  const [isAfter, setIsAfter] = useState(false);

  const themeContainerStyle =
    colorScheme === "light"
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const renderItem = ({ item }: DuaMenuItemProp) => {
    return (
      <DuaMenuItem
        onPress={() => {
          console.log("pressed");
        }}
        item={item}
      />
    );
  };

  const handlePresentModalPress = useCallback(() => {
    if (!showFilter) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [showFilter]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 1) {
        setShowFilter(true);
      } else {
        setShowFilter(false);
      }
    },
    [showFilter]
  );

  useEffect(() => {
    dispatch(
      EveryDaysDuaActions.getEveryDaysDua(search, {
        before: isBefore,
        after: isAfter,
      })
    );
  }, [search, isBefore, isAfter]);

  return (
    <SafeAreaView style={{ ...styles.container, ...themeContainerStyle }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Ionicons
            name={Platform.OS === "android" ? "md-search" : "ios-search"}
            size={24}
            color="#26C6DA"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Doa..."
            placeholderTextColor="#26C6DA"
            value={search}
            onChangeText={(text) => setSearch(text)}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.filterIcon}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-filter" : "ios-filter"}
            size={32}
            color="#26C6DA"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.duaItemContainer}>
        <FlatList
          style={{ padding: 10 }}
          data={everyDaysDua}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        ></FlatList>
      </View>

      <BottomSheetModalProvider>
        <View style={styles.bottomSheetContainer}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            animateOnMount={true}
            stackBehavior="push"
          >
            <View style={styles.filterBSContainer}>
              <Text style={styles.bSTitleText}>Filter</Text>
            </View>

            <View style={styles.bSMenuContainer}>
              <Text style={styles.bSTitle}>Waktu Membaca</Text>
              <View style={styles.filterMenuContainer}>
                <TouchableOpacity
                  style={
                    isBefore
                      ? styles.filterMenuButtonActive
                      : styles.filterMenuButtonInactive
                  }
                  onPress={() => {
                    if (isBefore) {
                      setIsBefore(false);
                    } else {
                      setIsBefore(true);
                    }
                  }}
                >
                  <Text
                    style={
                      isBefore
                        ? styles.filterMenuButtonTextActive
                        : styles.filterMenuButtonTextInactive
                    }
                  >
                    Sebelum
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    isAfter
                      ? styles.filterMenuButtonActive
                      : styles.filterMenuButtonInactive
                  }
                  onPress={() => {
                    if (isAfter) {
                      setIsAfter(false);
                    } else {
                      setIsAfter(true);
                    }
                  }}
                >
                  <Text
                    style={
                      isAfter
                        ? styles.filterMenuButtonTextActive
                        : styles.filterMenuButtonTextInactive
                    }
                  >
                    Sesudah
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 80 }}></View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

export const screenOptions = (props: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<{ params: { title: string; mode: ColorSchemeName } }, any>;
}): NativeStackNavigationOptions => {
  return {
    headerTitle: props?.route?.params?.title || "Doa Harian",
    headerShown: true,
    headerStyle: {
      backgroundColor: "#26A2B3",
    },
    headerTintColor:
      Platform.OS === "android"
        ? "#FFFFFF"
        : props.route.params?.mode === "light"
        ? "#000000"
        : "#FFFFFF",
    headerTitleStyle: {
      fontWeight: "bold",
      fontFamily: "dubai-regular",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContainer: { flex: 1, borderRadius: 24, padding: 10 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
    marginTop: 20,
  },
  searchIcon: {
    flex: 11,
    padding: 10,
    borderColor: "#777",
    margin: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 48,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  searchInput: {
    padding: 6,
    fontSize: 14,
    fontFamily: "dubai-regular",
    color: "#26C6DA",
  },
  filterIcon: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: 48,
    width: 48,
    marginHorizontal: 10,
  },
  duaItemContainer: { flex: 11, margin: 10 },
  filterBSContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
  bSTitle: {
    fontFamily: "dubai-regular",
    fontSize: 18,
    marginBottom: 2,
  },
  bSTitleText: { fontFamily: "dubai-bold", fontSize: 20 },
  filterMenuContainer: {
    flexDirection: "row",
  },
  filterMenuButtonInactive: {
    borderColor: "#26A2B2",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 20,
  },
  filterMenuButtonActive: {
    borderColor: "#26A2B2",
    backgroundColor: "#26A2B2",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 20,
  },
  bSMenuContainer: { flex: 1, padding: 10, marginHorizontal: 10 },
  filterMenuButtonTextInactive: {
    fontFamily: "dubai-regular",
    fontSize: 16,
    color: "#26A2B2",
  },
  filterMenuButtonTextActive: {
    fontFamily: "dubai-regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default EveryDaysDua;
