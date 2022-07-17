import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  useColorScheme,
  Platform,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { HeaderDzikirDuaState } from './HeaderDzikirDuaOptions';

interface DzikirDuaItemProps {
  note: string;
  arabic: string;
  arabicLatin: string;
  meaningId: string;
  state: HeaderDzikirDuaState;
}

const DzikirDuaItem = ({
  note,
  arabic,
  arabicLatin,
  meaningId,
  state,
}: DzikirDuaItemProps) => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const backgroundColor = colorScheme === 'light' ? '#FFFFFF' : '#121620';
  const colorArabic = colorScheme === 'light' ? '#292727' : '#d6d8d8';
  const colorArabicLatin = colorScheme === 'light' ? '#000000' : '#FFFFFF';
  const colorMeaning = colorScheme === 'light' ? '#515151' : '#aeaeae';

  return (
    <View style={{ ...styles.item, backgroundColor }}>
      <View>
        <Text>
          <View style={styles.noteBackground}>
            <Text style={{ ...styles.note }}>{note}</Text>
          </View>
        </Text>
      </View>

      {state.arabic && (
        <View style={{ marginVertical: 10 }}>
          <RenderHtml
            contentWidth={width}
            source={{ html: arabic }}
            baseStyle={{ ...styles.arabic, color: colorArabic }}
          />
        </View>
      )}

      {state.latin && (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.arabicLatin, color: colorArabicLatin }}>
            {arabicLatin}
          </Text>
        </View>
      )}

      {state.meaning && (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.meaning, color: colorMeaning }}>
            {meaningId}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
  },
  noteBackground: {
    backgroundColor: '#3D3FB8',
    borderRadius: 16,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  note: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'dubai-regular',
  },
  arabic: {
    fontFamily: 'arial',
    fontSize: 22,
    textAlign: Platform.OS === 'ios' ? 'justify' : 'center',
    writingDirection: 'rtl',
    lineHeight: 44,
  },
  arabicLatin: {
    fontFamily: 'roboto-italic',
    fontSize: 16,
    textAlign: 'justify',
  },
  meaning: {
    textAlign: 'justify',
    fontFamily: 'dubai-regular',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default DzikirDuaItem;
