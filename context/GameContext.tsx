// context/GameContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const NATO = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'];
const STORAGE_KEY = 'CURRENT_GAME_STATE';
type GameMode = 'classic' | 'ready-or-not';

type GameData = {
  teams: { name: string; score: number }[];
};

type GameState = {
  mode: GameMode;
  isActive: boolean;
  data?: GameData;
};

type DraftSettings = {
  mode?: GameMode;
  teamCount?: number;
  maxPurchasesPerItem?: Record<string, number>;
};

type GameContextType = {
  game: GameState | null;
  draft: DraftSettings;
  setDraft: (d: DraftSettings) => void;
  startGame: () => void;
  endGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [draft, setDraft] = useState<DraftSettings>({});
  const [game, setGame] = useState<GameState | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setGame(JSON.parse(data));
    });
  }, []);

  const startGame = async () => {
    if (draft.mode && draft.teamCount) {
      const teams = Array.from({ length: draft.teamCount }, (_, i) => ({
        name: NATO[i] || `Team${i + 1}`,
        score: 0,
      }));
      const newGame: GameState = { mode: draft.mode, isActive: true, data: { teams } };
      setGame(newGame);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGame));
    } else {
      throw Error('Trying to start game without selecting game mode or team count.');
    }
  };

  const endGame = async () => {
    setGame(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return <GameContext.Provider value={{ game, draft, setDraft, startGame, endGame }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
