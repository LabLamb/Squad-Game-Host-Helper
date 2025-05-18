// app/game/classic/index.tsx
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/context/GameContext';
import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function ClassicIndex() {
  const { game, endGame } = useGame();
  const router = useRouter();

  if (!game?.isActive) {
    return <Redirect href="/game/classic/new" />;
  }

  const handleReset = () => {
    endGame();
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Classic Game Dashboard</ThemedText>
      <View style={styles.teamList}>
        {game.data?.teams.map((team, idx) => (
          <View key={idx} style={styles.teamRow}>
            <ThemedText type="defaultSemiBold">{team.name}</ThemedText>
            <ThemedText>{team.score}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedButton title="Reset Game" onPress={handleReset} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  teamList: {
    width: '80%',
    marginVertical: 20,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#555',
  },
});
