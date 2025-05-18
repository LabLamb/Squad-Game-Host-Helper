import { ThemedButton } from '@/components/ThemedButton';
import { useGame } from '@/context/GameContext';
import { Redirect } from 'expo-router';

const ClassicGameHome = () => {
  const { game, endGame } = useGame();

  return game?.isActive ? (
    <ThemedButton title="End Game" onPress={() => endGame()} />
  ) : (
    <Redirect href="/game/classic/new" />
  );
};

export default ClassicGameHome;
