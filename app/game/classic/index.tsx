import Counter from '@/components/Counter';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const ClassicGameHome = () => {
  const [teamNum, setTeamNum] = useState(2);

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
      }}
    >
      <ThemedText type="hero">How many teams?</ThemedText>
      <Counter value={teamNum} onChange={(num) => setTeamNum(num)} min={2} max={6} />
      <ThemedButton title="Confirm" />
    </ThemedView>
  );
};

export default ClassicGameHome;
