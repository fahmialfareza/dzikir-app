import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Platform, Alert, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import DzikirItemInput from './DzikirItemInput';

import DzikirTarget from '../../models/dzikirTarget';

import colorData from '../../constants/data/colorData';

import {
  updateDzikirTarget,
  deleteDzikirTarget,
} from '../../redux/actions/dzikirTarget';

interface EditDzikirItemInputProps {
  editModalVisible: boolean;
  item: DzikirTarget;
  setEditModalVisible: (visible: boolean) => void;
  updateDzikirTarget: (item: DzikirTarget) => void;
  deleteDzikirTarget: (id: number) => void;
}

interface DispatchProps {
  updateDzikirTarget: (item: DzikirTarget) => void;
  deleteDzikirTarget: (id: number) => void;
}

function EditDzikirItemInput({
  editModalVisible,
  setEditModalVisible,
  item,
  deleteDzikirTarget,
  updateDzikirTarget,
}: EditDzikirItemInputProps) {
  const [state, setState] = useState<DzikirTarget>(item);

  useEffect(() => {
    setState(item);
  }, [item]);

  return (
    <DzikirItemInput
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
        await updateDzikirTarget(state);

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

        Alert.alert('Sukses', 'Dzikir berhasil diubah');
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
              await deleteDzikirTarget(state.id);

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

              Alert.alert('Sukses', 'Dzikir berhasil dihapus');

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
    updateDzikirTarget: async (item: DzikirTarget) => {
      await dispatch(
        updateDzikirTarget(
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
    deleteDzikirTarget: async (id: number) => {
      await dispatch(deleteDzikirTarget(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditDzikirItemInput);
