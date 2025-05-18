import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Href, router } from 'expo-router';
import { Pressable, View } from 'react-native';

const GAME_MODES: { name: string; route: Href }[] = [
  {
    name: 'Classic',
    route: '/game/classic',
  },
  // {
  //   name: 'Ready Or Not',
  //   route: '/game/ready-or-not',
  // },
  // {
  //   name: '13 Hours',
  //   route: '/game/13-hours',
  // },
  // {
  //   name: 'Squad QB',
  //   route: '/game/squadqb',
  // },
  // {
  //   name: 'Black Hawk Down',
  //   route: '/game/black-hawk-down',
  // },
];

const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, 'surface');

  return (
    <ParallaxScrollView
      headerView={
        <ThemedText
          type="hero"
          style={{
            flex: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            position: 'absolute',
            left: 25,
            bottom: 25,
          }}
        >{`Select Game Mode`}</ThemedText>
      }
      headerBackgroundColor={{ light: backgroundColor, dark: backgroundColor }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'space-between',
        }}
      >
        {GAME_MODES.map((item) => {
          return (
            <Pressable style={{ flexBasis: '49%', backgroundColor }} onPress={() => router.push(item.route)}>
              <ThemedText
                type="subtitle"
                style={{
                  fontFamily: 'Bender-Bold',
                  margin: 24,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                {item.name}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
