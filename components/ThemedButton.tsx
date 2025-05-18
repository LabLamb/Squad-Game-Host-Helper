import { useThemeColor } from '@/hooks/useThemeColor';
import { Pressable, StyleSheet, TextStyle, ViewStyle, type PressableProps } from 'react-native';
import { ThemedText } from './ThemedText';

type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  textLightColor?: string;
  textDarkColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function ThemedButton({
  title,
  style,
  textStyle,
  lightColor,
  darkColor,
  textLightColor,
  textDarkColor,
  disabled,
  ...props
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, disabled ? 'disabled' : 'icon');
  const color = useThemeColor({ light: textLightColor, dark: textDarkColor }, 'text');

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor,
          opacity: pressed || disabled ? 0.7 : 1,
        },
        styles.button,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <ThemedText style={[{ color, fontSize: 20 }, textStyle]}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
});
