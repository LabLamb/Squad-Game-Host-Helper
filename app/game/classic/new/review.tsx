// app/game/classic/new/review.tsx

import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/context/GameContext';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const NATO = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];

export default function ReviewScreen() {
  const { draft, startGame } = useGame();
  const router = useRouter();

  // If someone hits this URL without finishing setup, redirect back.
  if (!draft.mode || !draft.teamCount || !draft.maxPurchasesPerItem) {
    return <Redirect href="/" />;
  }

  // Build the teams array with initial score = 0
  const teams = Array.from({ length: draft.teamCount }, (_, i) => ({
    name: NATO[i] ?? `Team${i + 1}`,
    score: 0,
  }));

  const handleStart = () => {
    startGame();
    router.replace('/game/classic');
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Review Settings</ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle">Teams ({teams.length})</ThemedText>
          {teams.map((t, idx) => (
            <View key={idx} style={styles.row}>
              <ThemedText>{t.name}</ThemedText>
              <ThemedText>Score: {t.score}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Item Limits</ThemedText>
          {Object.entries(draft.maxPurchasesPerItem ?? {}).map(([key, count]) => (
            <View key={key} style={styles.row}>
              <ThemedText>{key.replace(/([A-Z])/g, ' $1')}</ThemedText>
              <ThemedText>{count}</ThemedText>
            </View>
          ))}
        </View>

        <ThemedButton title="Start Game" onPress={handleStart} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  section: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
});
