import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import screenMode from '../../constants/screenMode';

import DzikirItem, {
  DzikirItemProps,
} from '../../components/dzikir/DzikirItem';
import AddDzikirItemInput from '../../components/dzikir/AddDzikirItemInput';
import EditDzikirItemInput from '../../components/dzikir/EditDzikirItemInput';
import DzikirTarget from '../../models/dzikirTarget';

import {
  getDzikirTargets,
  addDzikirTarget,
  updateDzikirTarget,
  deleteDzikirTarget,
} from '../../redux/actions/dzikirTarget';
import { RootState } from '../../redux';
import { DzikirTargetState } from '../../redux/types';

interface DzikirProps {
  navigation: NavigationProp<any, any>;
  getDzikirTargets: () => void;
  dzikirTarget: DzikirTargetState;
}

interface DispatchProps {
  getDzikirTargets: () => void;
}

const Dzikir = ({
  navigation,
  getDzikirTargets,
  dzikirTarget: { dzikirTargets },
}: DzikirProps) => {
  const colorScheme = useColorScheme();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editItemData, setEditItemData] = useState<DzikirTarget>({
    id: 0,
    title: '',
    arabic: '',
    background: '',
    color: '#FFFFFF',
    target: 100,
    counter: 0,
  });

  useEffect(() => {
    getDzikirTargets();
  }, []);

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
    if (item.id > 5) {
      return (
        <DzikirItem
          item={item}
          onPress={() => selectDzikirHandler(item)}
          onLongPress={() => {
            setEditItemData(item);
            setEditModalVisible(true);
          }}
          backgroundColor={item.background || themeTextStyle.color}
          textColor={item.color || themeContainerStyle.backgroundColor}
        />
      );
    }

    return (
      <DzikirItem
        item={item}
        onPress={() => selectDzikirHandler(item)}
        onLongPress={() => {
          Alert.alert(
            'Tidak bisa mengubah data ini',
            'Dzikir bawaan aplikasi tidak bisa diubah atau dihapus',
            [{ text: 'OK' }]
          );
        }}
        backgroundColor={item.background || themeTextStyle.color}
        textColor={item.color || themeContainerStyle.backgroundColor}
      />
    );
  };

  if (dzikirTargets.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, themeContainerStyle, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color={themeTextStyle.color} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={styles.topRow}>
        <View style={styles.topRowContent}></View>
      </View>

      <View style={styles.itemRow}>
        <FlatList
          data={dzikirTargets}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            size={32}
            color="white"
          />
        </TouchableOpacity>

        <AddDzikirItemInput
          addModalVisible={addModalVisible}
          setAddModalVisible={setAddModalVisible}
        />

        <EditDzikirItemInput
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          item={editItemData}
        />
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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

const mapStateToProps = (state: RootState) => ({
  dzikirTarget: state.dzikirTarget,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    getDzikirTargets: async () => {
      await dispatch(getDzikirTargets());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dzikir);
