import React, { useState } from 'react';
import { Platform, Alert, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TasbeehItemInput from './TasbeehItemInput';
import TasbeehTarget from '../../models/tasbeehTarget';
import colorData from '../../constants/data/colorData';
import { useAppDispatch } from '../../redux';
import TasbeehTargetActions from '../../redux/actions/TasbeehTargetActions';

interface AddTasbeehItemInputProps {
  addModalVisible: boolean;
  setAddModalVisible: (visible: boolean) => void;
}

function AddTasbeehItemInput({
  addModalVisible,
  setAddModalVisible,
}: AddTasbeehItemInputProps) {
  const dispatch = useAppDispatch();

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
      actionText={<>Tambahkan</>}
      enableRemoveButton={false}
      onSubmitHandler={async () => {
        dispatch(TasbeehTargetActions.addTasbeehTarget(state));

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

export default AddTasbeehItemInput;
