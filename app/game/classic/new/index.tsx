import { ThemedButton } from '@/components/ThemedButton';
import { ThemedCounter } from '@/components/ThemedCounter';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/context/GameContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

const NewGameScreen = () => {
  const { draft, setDraft } = useGame();
  const [teamNum, setTeamNum] = useState(3);

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
        <ThemedCounter value={teamNum} onChange={(num) => setTeamNum(num)} min={2} max={6} />
      </View>
      <ThemedButton
        title="Next"
        onPress={() => {
          setDraft({ ...draft, mode: 'classic', teamCount: teamNum });
          router.push('/game/classic/new/itemList');
        }}
      />
    </ThemedView>
  );
};

export default NewGameScreen;
