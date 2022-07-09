import React, { useState } from 'react';
import { Platform, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Ionicons from '@expo/vector-icons/Ionicons';

import TasbeehItemInput from './TasbeehItemInput';

import TasbeehTarget from '../../models/tasbeehTarget';

import colorData from '../../constants/data/colorData';

import { addTasbeehTarget } from '../../redux/actions/tasbeehTarget';

interface AddTasbeehItemInputProps {
  addModalVisible: boolean;
  setAddModalVisible: (visible: boolean) => void;
  addTasbeehTarget: (item: TasbeehTarget) => void;
}

interface DispatchProps {
  addTasbeehTarget: (item: TasbeehTarget) => void;
}

function AddTasbeehItemInput({
  addModalVisible,
  setAddModalVisible,
  addTasbeehTarget,
}: AddTasbeehItemInputProps) {
  const [state, setState] = useState<TasbeehTarget>({
    id: 0,
    title: '',
    arabic: '',
    background: colorData[0].color,
    color: '#FFFFFF',
    target: 100,
    counter: 0,
  });

  return (
    <TasbeehItemInput
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
        await addTasbeehTarget(state);

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

        Alert.alert('Sukses', 'Tasbih berhasil ditambahkan');
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
    addTasbeehTarget: async (item: TasbeehTarget) => {
      await dispatch(
        addTasbeehTarget(
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

export default connect(null, mapDispatchToProps)(AddTasbeehItemInput);
