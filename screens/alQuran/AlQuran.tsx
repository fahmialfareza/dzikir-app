import React, { useState, useRef } from "react";
import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Platform,
  ColorSchemeName,
  ActivityIndicator,
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import screenMode from "../../constants/screenMode";

const AlQuran = () => {
  const colorScheme = useColorScheme();
  const webViewRef = useRef<WebView>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const themeTextStyle =
    colorScheme === "light"
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light"
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  if (isLoading) {
    <SafeAreaView
      style={[styles.container, themeContainerStyle, styles.loadingContainer]}
    >
      <ActivityIndicator size="large" color={themeTextStyle.color} />
    </SafeAreaView>;
  }

  if (isError) {
    <SafeAreaView
      style={[styles.container, themeContainerStyle, styles.errorContainer]}
    >
      <Text style={[styles.errorText, themeTextStyle]}>
        Terjadi kesalahan saat memuat halaman. Silahkan coba lagi.
      </Text>
    </SafeAreaView>;
  }

  const handleWebViewRef = (ref: WebView) => {
    webViewRef.current = ref;
  };

  return (
    <SafeAreaView style={{ flex: 1, ...themeContainerStyle }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              webViewRef.current?.reload();
            }}
          />
        }
      >
        <WebView
          scalesPageToFit={true}
          useWebView2={true}
          userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36"
          source={{ uri: "http://quran.com/id" }}
          ref={handleWebViewRef}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setIsError(true)}
          onHttpError={() => setIsError(true)}
          renderError={() => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ECFDFE",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "dubai-regular",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Terjadi kesalahan saat memuat halaman. Silahkan coba lagi.
                </Text>
                <Button
                  title="Muat Ulang"
                  onPress={() => webViewRef.current?.reload()}
                />
              </View>
            );
          }}
          style={{
            position: "relative",
          }}
          renderLoading={() => (
            <SafeAreaView
              style={[
                styles.container,
                themeContainerStyle,
                styles.loadingContainer,
              ]}
            >
              <ActivityIndicator size="large" color={themeTextStyle.color} />
            </SafeAreaView>
          )}
          allowsBackForwardNavigationGestures
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = (props: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<{ params: { title: string; mode: ColorSchemeName } }, any>;
}): NativeStackNavigationOptions => {
  return {
    headerTitle: props?.route?.params?.title || "Al-Qur'an",
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
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontFamily: "dubai-regular",
    color: "#242c40",
  },
});

export default AlQuran;
