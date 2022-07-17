import React from "react";
import { Text, StyleSheet, Dimensions, Platform } from "react-native";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

interface TasbihCounterProps {
  count: string;
  addColor: string;
  resetColor: string;
  addCounterHandler: () => Promise<void>;
  resetCounterHandler: () => Promise<void>;
}

function TasbihCounter({
  count,
  addColor,
  addCounterHandler,
  resetColor,
  resetCounterHandler,
}: TasbihCounterProps) {
  return (
    <>
      <Text style={styles.counterNumberText}>{count}</Text>
      <Svg width={300} height={400} viewBox="0 0 300 393" fill="none">
        <G filter="url(#filter0_d_56_271)">
          <G clipPath="url(#clip0_56_271)">
            <Path
              d="M148.72 384.933c-105.19-2.68-119.938-59.298-119.938-59.298s-9.765-22.513 1.482-59.633c3.838-12.663 4.512-26.131 1.616-39.062C24.54 193.907 6.963 160.271 4 101.242 4-1.809 148.72 0 148.72 0S289.468-3.82 296 99.634c.606 63.452-15.624 96.618-23.099 124.022-3.636 13.401-3.502 27.472-.134 40.939 10.034 39.867 1.077 63.117 1.077 63.117s-19.933 59.834-125.124 57.221z"
              fill="url(#paint0_linear_56_271)"
            />
            <Path
              d="M148.788 379.908c-102.497-2.613-116.84-58.494-116.84-58.494s-9.496-22.245 1.481-58.896c3.771-12.529 4.377-25.796 1.549-38.594-7.139-32.496-24.311-65.663-27.207-124.022C7.771-1.742 148.788.067 148.788.067s137.111-3.82 143.441 98.36c.539 62.649-15.22 95.346-22.493 122.415-3.569 13.2-3.367 27.137-.135 40.403 9.765 39.331 1.011 62.313 1.011 62.313s-19.395 58.963-121.824 56.35z"
              fill="url(#paint1_linear_56_271)"
            />
            <Path
              d="M148.788 376.089c-98.456-2.48-112.329-56.35-112.329-56.35s-9.09-21.441 1.415-56.752c3.569-12.06 4.175-24.858 1.481-37.119-6.869-31.358-23.368-63.318-26.129-119.467.067-97.959 135.562-96.216 135.562-96.216s131.723-3.686 137.851 94.742c.539 60.37-14.613 91.861-21.617 117.925-3.434 12.731-3.3 26.132-.135 38.929 9.361 37.924 1.011 60.035 1.011 60.035s-18.587 56.752-117.11 54.273z"
              fill="url(#paint2_linear_56_271)"
            />
            <Path
              d="M148.855 376.089c-61.147 0-107.075-55.814-98.994-106.87 1.953-12.262-2.223-29.415-4.782-41.542-6.532-30.956-22.156-62.581-24.782-118.06 0-96.752 128.558-95.077 128.558-95.077s125.056-3.618 130.781 93.603c.538 59.633-13.873 90.722-20.473 116.518-3.232 12.597-8.552 26.668-5.522 39.331 8.889 37.388-22.492 112.097-104.786 112.097z"
              fill="#FCDDEC"
            />
            <Path
              d="M244.482 158.395H58.279c-7.543 0-13.671-6.164-13.671-13.601V84.29c0-7.504 6.196-13.602 13.67-13.602h186.204c7.543 0 13.671 6.165 13.671 13.602v60.437c.067 7.504-6.128 13.668-13.671 13.668z"
              fill="url(#paint3_linear_56_271)"
            />
            <Path
              d="M238.287 151.762H64.474c-6.667 0-12.189-5.427-12.189-12.127V89.382c0-6.633 5.455-12.127 12.19-12.127h173.879c6.667 0 12.189 5.427 12.189 12.127v50.253c-.067 6.633-5.522 12.127-12.256 12.127z"
              fill="#F2F2F2"
            />
            <Path
              d="M212.494 251.061c-10.909-23.451-34.816-39.733-62.494-39.733-28.149 0-52.393 16.818-63.033 40.939-19.193-2.01-32.056-4.757-38.184-6.231 1.347 8.107 2.155 16.415 1.078 23.183-8.081 51.056 37.914 106.87 98.994 106.87 82.294 0 113.675-74.642 104.786-112.097-1.414-5.896-1.01-12.127.202-18.359-14.546 2.212-28.284 4.021-41.349 5.428z"
              fill="#3D3FB8"
            />
            <Path
              d="M150 339.304c32.172 0 58.252-25.949 58.252-57.958s-26.08-57.958-58.252-57.958c-32.172 0-58.252 25.949-58.252 57.958s26.08 57.958 58.252 57.958z"
              fill="url(#paint4_linear_56_271)"
            />
            <Path
              d="M150 323.558c23.431 0 42.426-18.899 42.426-42.212 0-23.313-18.995-42.212-42.426-42.212s-42.426 18.899-42.426 42.212c0 23.313 18.995 42.212 42.426 42.212z"
              fill={addColor}
              onPress={addCounterHandler}
            />
            <Path
              d="M228.926 221.244c10.005 0 18.116-8.069 18.116-18.024 0-9.954-8.111-18.023-18.116-18.023-10.005 0-18.115 8.069-18.115 18.023 0 9.955 8.11 18.024 18.115 18.024z"
              fill="url(#paint5_linear_56_271)"
            />
            <Path
              d="M228.926 216.353c7.29 0 13.199-5.88 13.199-13.133 0-7.252-5.909-13.132-13.199-13.132s-13.199 5.88-13.199 13.132c0 7.253 5.909 13.133 13.199 13.133z"
              fill={resetColor}
              onPress={resetCounterHandler}
            />
          </G>
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_56_271"
            x1={212.375}
            y1={0.547088}
            x2={214.592}
            y2={384.353}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#E1ADFA" />
            <Stop offset={1} stopColor="#FCB4B4" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_56_271"
            x1={12.4058}
            y1={379.992}
            x2={385.523}
            y2={154.178}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FF9315" />
            <Stop offset={1} stopColor="#FFF0CB" />
            <Stop offset={1} stopColor="#FFF0CB" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_56_271"
            x1={13.226}
            y1={10.1666}
            x2={376.041}
            y2={225.692}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#7D2DFF" />
            <Stop offset={1} stopColor="#41DDFF" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_56_271"
            x1={44.6079}
            y1={70.6883}
            x2={125.344}
            y2={226.995}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#7D2DFF" />
            <Stop offset={1} stopColor="#41DDFF" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_56_271"
            x1={174.882}
            y1={223.559}
            x2={175.386}
            y2={339.106}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#E1ADFA" />
            <Stop offset={1} stopColor="#FCB4B4" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_56_271"
            x1={247.043}
            y1={186.323}
            x2={207.491}
            y2={216.909}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#CCE0FF" />
            <Stop offset={1} stopColor="#8A2EFF" />
          </LinearGradient>
          <ClipPath id="clip0_56_271">
            <Path fill="#fff" transform="translate(4)" d="M0 0H292V385H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
}

const styles = StyleSheet.create({
  counterNumberText: {
    top:
      Platform.OS == "android"
        ? Dimensions.get("window").height / 10
        : Dimensions.get("window").height / 11,
    fontSize: 72,
    zIndex: 99999,
    position: "absolute",
    fontFamily: "ds-digit",
    color: "#3D3FB8",
  },
});

export default TasbihCounter;
