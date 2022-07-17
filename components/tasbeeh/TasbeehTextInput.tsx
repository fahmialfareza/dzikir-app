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

interface TasbeehTextInputProps {
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
  maxLength?: number;
  isHasLabel?: boolean;
}

function TasbeehTextInput({
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
  maxLength,
  isHasLabel = true,
}: TasbeehTextInputProps) {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === 'light'
      ? screenMode.lightThemeText
      : screenMode.darkThemeText;

  return (
    <View style={styles.container}>
      {isHasLabel && (
        <View style={styles.labelInput}>
          <Text style={[styles.modalText, themeTextStyle]}>{label}</Text>
        </View>
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={'#777'}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          ref={reference}
          maxLength={maxLength || 32}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  labelInput: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  modalText: {
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 6,
    margin: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'dubai-regular',
  },
  inputView: { flex: 1 },
});

export default TasbeehTextInput;
