import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'hero' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'hero' && styles.hero,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  hero: {
    fontFamily: 'Bender-Bold',
    fontSize: 60,
    lineHeight: 60,
  },
  default: {
    fontFamily: 'Bender-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'Bender-Bold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Bender-Bold',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'Bender-Bold',
    fontSize: 28,
    fontWeight: 'bold',
  },
  link: {
    fontFamily: 'Bender-Bold',
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
