import React, { useState } from 'react';
import { Platform, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Ionicons from '@expo/vector-icons/Ionicons';

import DzikirItemInput from './DzikirItemInput';

import DzikirTarget from '../../models/dzikirTarget';

import colorData from '../../constants/data/colorData';

import { addDzikirTarget } from '../../redux/actions/dzikirTarget';

interface AddDzikirItemInputProps {
  addModalVisible: boolean;
  setAddModalVisible: (visible: boolean) => void;
  addDzikirTarget: (item: DzikirTarget) => void;
}

interface DispatchProps {
  addDzikirTarget: (item: DzikirTarget) => void;
}

function AddDzikirItemInput({
  addModalVisible,
  setAddModalVisible,
  addDzikirTarget,
}: AddDzikirItemInputProps) {
  const [state, setState] = useState<DzikirTarget>({
    id: 0,
    title: '',
    arabic: '',
    background: colorData[0].color,
    color: '#FFFFFF',
    target: 100,
    counter: 0,
  });

  return (
    <DzikirItemInput
      modalVisible={addModalVisible}
      setModalVisible={setAddModalVisible}
      actionText={
        <>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            color="white"
          />{' '}
          Tambahkan
        </>
      }
      enableRemoveButton={false}
      onSubmitHandler={async () => {
        await addDzikirTarget(state);

        setAddModalVisible(false);
        setState({
          id: 0,
          title: '',
          arabic: '',
          background: colorData[0].color,
          color: '#FFFFFF',
          target: 100,
          counter: 0,
        });

        Alert.alert('Sukses', 'Dzikir berhasil ditambahkan');
        Keyboard.dismiss();
      }}
      state={state}
      setState={setState}
    />
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    addDzikirTarget: async (item: DzikirTarget) => {
      await dispatch(
        addDzikirTarget(
          item.title,
          item.target,
          item.arabic || '',
          item.background || '',
          item.color || ''
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(AddDzikirItemInput);
