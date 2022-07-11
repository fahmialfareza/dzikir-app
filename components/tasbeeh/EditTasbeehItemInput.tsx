import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Platform, Alert, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import TasbeehItemInput from './TasbeehItemInput';

import TasbeehTarget from '../../models/tasbeehTarget';

import colorData from '../../constants/data/colorData';

import {
  updateTasbeehTarget,
  deleteTasbeehTarget,
} from '../../redux/actions/tasbeehTarget';

interface EditTasbeehItemInputProps {
  editModalVisible: boolean;
  item: TasbeehTarget;
  setEditModalVisible: (visible: boolean) => void;
  updateTasbeehTarget: (item: TasbeehTarget) => void;
  deleteTasbeehTarget: (id: number) => void;
}

interface DispatchProps {
  updateTasbeehTarget: (item: TasbeehTarget) => void;
  deleteTasbeehTarget: (id: number) => void;
}

function EditTasbeehItemInput({
  editModalVisible,
  setEditModalVisible,
  item,
  deleteTasbeehTarget,
  updateTasbeehTarget,
}: EditTasbeehItemInputProps) {
  const [state, setState] = useState<TasbeehTarget>(item);

  useEffect(() => {
    setState(item);
  }, [item]);

  return (
    <TasbeehItemInput
      modalVisible={editModalVisible}
      setModalVisible={setEditModalVisible}
      actionText={
        <>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-pencil' : 'ios-pencil'}
            color="white"
          />{' '}
          Ubah
        </>
      }
      enableRemoveButton={true}
      onSubmitHandler={async () => {
        await updateTasbeehTarget(state);

        setEditModalVisible(false);
        setState({
          id: 0,
          title: '',
          arabic: '',
          background: colorData[0].color,
          color: '#FFFFFF',
          target: 100,
          counter: 0,
        });

        Alert.alert('Sukses', 'Tasbih berhasil diubah');
        Keyboard.dismiss();
      }}
      onDeleteHandler={async () => {
        Alert.alert('Apakah kamu yakin?', 'Menghapus data ini', [
          {
            text: 'Tidak',
            style: 'cancel',
          },
          {
            text: 'Ya',
            style: 'destructive',
            onPress: async () => {
              await deleteTasbeehTarget(state.id);

              setEditModalVisible(false);
              setState({
                id: 0,
                title: '',
                arabic: '',
                background: colorData[0].color,
                color: '#FFFFFF',
                target: 100,
                counter: 0,
              });

              Alert.alert('Sukses', 'Tasbih berhasil dihapus');

              Keyboard.dismiss();
            },
          },
        ]);
      }}
      setState={setState}
      state={state}
      colorDefaultValue={colorData.find(
        (color) => color.color === item.background
      )}
    />
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    updateTasbeehTarget: async (item: TasbeehTarget) => {
      await dispatch(
        updateTasbeehTarget(
          item.id,
          item.title,
          item.target,
          item.arabic || '',
          item.background || '',
          item.color || '',
          item.counter
        )
      );
    },
    deleteTasbeehTarget: async (id: number) => {
      await dispatch(deleteTasbeehTarget(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditTasbeehItemInput);
