import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import screenMode from '../../constants/screenMode';
import dzikirData from '../../constants/dzikirData';

import DzikirItem, { DzikirItemProps } from '../../components/DzikirItem';
import { NavigationProp } from '@react-navigation/native';
import DzikirTarget from '../../models/dzikirTarget';

interface DzikirProps {
  navigation: NavigationProp<any, any>;
}

const Dzikir = ({ navigation }: DzikirProps) => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;
  const themeTextStyle =
    colorScheme === 'light'
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  const selectDzikirHandler = (item: DzikirTarget) => {
    navigation.navigate('DzikirDetails', { item });
  };

  const renderItem = ({ item }: DzikirItemProps) => {
    return (
      <DzikirItem
        item={item}
        onPress={() => selectDzikirHandler(item)}
        backgroundColor={item.background || themeTextStyle.color}
        textColor={item.color || themeContainerStyle.backgroundColor}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={styles.topRow}>
        <View style={styles.topRowContent}></View>
      </View>

      <View style={styles.itemRow}>
        <FlatList
          data={dzikirData}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.roundButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'Dzikir',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flex: 2,
  },
  itemRow: {
    flex: 4,
  },
  bottomRow: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  topRowContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageTopRowContent: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});

export default Dzikir;
