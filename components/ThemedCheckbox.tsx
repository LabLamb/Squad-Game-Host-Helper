import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

type ThemedCheckboxProps = {
  value: boolean;
  onToggle: () => void;
};

export const ThemedCheckbox = ({ value, onToggle }: ThemedCheckboxProps) => {
  const borderColor = useThemeColor({}, 'border');
  const fillColor = useThemeColor({}, 'icon');

  return (
    <Pressable
      onPress={onToggle}
      style={{
        width: 48,
        height: 48,
        borderWidth: 2,
        borderColor: value ? fillColor : borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: value ? fillColor : 'transparent',
      }}
    >
      {value && <MaterialIcons name="check" size={36} color="#fff" />}
    </Pressable>
  );
};
