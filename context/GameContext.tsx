// context/GameContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'CURRENT_GAME_STATE';

type GameState = {
  mode: string;
  isActive: boolean;
  data?: Record<string, any>; // can expand with teams, scores, etc.
};

type GameContextType = {
  game: GameState | null;
  startGame: (mode: 'classic' | 'ready-or-not') => void;
  endGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<GameState | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setGame(JSON.parse(data));
    });
  }, []);

  const startGame = async (mode: string) => {
    const newGame: GameState = { mode, isActive: true };
    setGame(newGame);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGame));
  };

  const endGame = async () => {
    setGame(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return <GameContext.Provider value={{ game, startGame, endGame }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
