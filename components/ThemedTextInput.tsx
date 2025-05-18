import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type ThemedTextInputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function ThemedTextInput({ label, style, inputStyle, ...props }: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'icon');
  const placeholderColor = useThemeColor({}, 'disabled');

  return (
    <View style={[styles.container, style]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        placeholderTextColor={placeholderColor}
        style={[
          styles.input,
          { color: textColor, borderColor, backgroundColor, outlineColor: `transparent` },
          inputStyle,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    letterSpacing: 1,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 18,
    fontFamily: 'Bender-Bold',
    letterSpacing: 2,
  },
});
