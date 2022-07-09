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
import { HomeAyahBottomImage } from '../../constants/assets';

import TasbeehItem, {
  TasbeehItemProps,
} from '../../components/tasbeeh/TasbeehItem';
import AddTasbeehItemInput from '../../components/tasbeeh/AddTasbeehItemInput';
import EditTasbeehItemInput from '../../components/tasbeeh/EditTasbeehItemInput';
import TasbeehTarget from '../../models/tasbeehTarget';

import {
  getTasbeehTargets,
  addTasbeehTarget,
  updateTasbeehTarget,
  deleteTasbeehTarget,
} from '../../redux/actions/tasbeehTarget';
import { RootState } from '../../redux';
import { TasbeehTargetState } from '../../redux/types';

interface TasbeehProps {
  navigation: NavigationProp<any, any>;
  getTasbeehTargets: () => void;
  tasbeehTarget: TasbeehTargetState;
}

interface DispatchProps {
  getTasbeehTargets: () => void;
}

const Tasbeeh = ({
  navigation,
  getTasbeehTargets,
  tasbeehTarget: { tasbeehTargets },
}: TasbeehProps) => {
  const colorScheme = useColorScheme();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editItemData, setEditItemData] = useState<TasbeehTarget>({
    id: 0,
    title: '',
    arabic: '',
    background: '',
    color: '#FFFFFF',
    target: 100,
    counter: 0,
  });

  useEffect(() => {
    getTasbeehTargets();
  }, []);

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;
  const themeTextStyle =
    colorScheme === 'light'
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  const selectTasbeehHandler = (item: TasbeehTarget) => {
    navigation.navigate('TasbeehDetails', { item });
  };

  const renderItem = ({ item }: TasbeehItemProps) => {
    if (item.id > 5) {
      return (
        <TasbeehItem
          item={item}
          onPress={() => selectTasbeehHandler(item)}
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
      <TasbeehItem
        item={item}
        onPress={() => selectTasbeehHandler(item)}
        onLongPress={() => {
          Alert.alert(
            'Tidak bisa mengubah data ini',
            'Tasbeeh bawaan aplikasi tidak bisa diubah atau dihapus',
            [{ text: 'OK' }]
          );
        }}
        backgroundColor={item.background || themeTextStyle.color}
        textColor={item.color || themeContainerStyle.backgroundColor}
      />
    );
  };

  if (tasbeehTargets.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, themeContainerStyle, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color={themeTextStyle.color} />
      </SafeAreaView>
    );
  }

  const imageTopRowContentWidth = Dimensions.get('window').width - 40;

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={styles.topRow}>
        <View style={styles.topRowContent}>
          <HomeAyahBottomImage width={imageTopRowContentWidth} />
        </View>
      </View>

      <View style={styles.itemRow}>
        <FlatList
          data={tasbeehTargets}
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

        <AddTasbeehItemInput
          addModalVisible={addModalVisible}
          setAddModalVisible={setAddModalVisible}
        />

        <EditTasbeehItemInput
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          item={editItemData}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'Tasbeeh',
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
  tasbeehTarget: state.tasbeehTarget,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    getTasbeehTargets: async () => {
      await dispatch(getTasbeehTargets());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasbeeh);