import { ThemedButton } from '@/components/ThemedButton';
import Counter from '@/components/ThemedCounter';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/context/GameContext';
import { useState } from 'react';
import { View } from 'react-native';

const NewGameScreen = () => {
  const { startGame } = useGame();
  const [teamNum, setTeamNum] = useState(2);

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 75,
      }}
    >
      <ThemedText type="hero">New Game</ThemedText>
      <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText type="subtitle">How many teams?</ThemedText>
        <Counter value={teamNum} onChange={(num) => setTeamNum(num)} min={2} max={6} />
      </View>
      <ThemedButton title="Confirm" onPress={() => startGame('classic')} />
    </ThemedView>
  );
};

export default NewGameScreen;
