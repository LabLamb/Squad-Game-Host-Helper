import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type ThemedCounterProps = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

export function ThemedCounter({
  value = 0,
  onChange,
  min = 0,
  max = Infinity,
  style,
  buttonStyle,
  textStyle,
  disabled,
}: ThemedCounterProps) {
  const [count, setCount] = useState(value);
  const bgColor = useThemeColor({}, 'surface');
  const btnColor = useThemeColor({}, 'icon');

  const updateCount = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    setCount(clamped);
    onChange?.(clamped);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      <Pressable
        style={[styles.button, { backgroundColor: btnColor }, buttonStyle]}
        onPress={() => updateCount(count - 1)}
      >
        <ThemedText type="title">−</ThemedText>
      </Pressable>

      <ThemedText style={[styles.value, textStyle]} type="defaultSemiBold">
        {count}
      </ThemedText>

      <Pressable
        style={[styles.button, { backgroundColor: btnColor }, buttonStyle]}
        onPress={() => updateCount(count + 1)}
      >
        <ThemedText type="title">＋</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    minHeight: 75,
    aspectRatio: 4,
  },
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
  },
});
