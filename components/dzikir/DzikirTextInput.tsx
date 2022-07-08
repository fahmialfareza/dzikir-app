import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
} from 'react-native';

import screenMode from '../../constants/screenMode';

interface DzikirTextInputProps {
  label: string;
  placeholder: string;
  returnKeyType: ReturnKeyTypeOptions;
  returnKeyLabel: string;
  reference: React.LegacyRef<TextInput>;
  onSubmitEditing?: () => void;
  keyboardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

function DzikirTextInput({
  label,
  placeholder,
  returnKeyLabel,
  returnKeyType,
  reference,
  onSubmitEditing,
  keyboardType,
  autoFocus,
  value,
  onChangeText,
}: DzikirTextInputProps) {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === 'light'
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  return (
    <>
      <View style={styles.labelInput}>
        <Text style={[styles.modalText, themeTextStyle]}>{label}</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={'#777'}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          ref={reference}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  labelInput: {
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 6,
    margin: 2,
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'dubai-regular',
  },
});

export default DzikirTextInput;
