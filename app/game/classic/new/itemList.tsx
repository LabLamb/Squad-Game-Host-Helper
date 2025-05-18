import { ThemedButton } from '@/components/ThemedButton';
import { ThemedCheckbox } from '@/components/ThemedCheckbox';
import { ThemedCounter } from '@/components/ThemedCounter';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGame } from '@/context/GameContext';
import { useRouter } from 'expo-router';
import React, { useReducer } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type ItemKey = 'frag' | 'tq' | 'selfResTq' | 'shield' | 'ivBag' | 'hacker' | 'startingPoint';

const ITEM_DEFS: {
  key: ItemKey;
  label: string;
  category: 'Consumables' | 'Equipment/Service';
}[] = [
  { key: 'tq', label: 'TQ', category: 'Consumables' },
  { key: 'selfResTq', label: 'Self-Res TQ', category: 'Consumables' },
  { key: 'frag', label: 'Frag Grenade', category: 'Consumables' },
  { key: 'startingPoint', label: 'Starting Point', category: 'Equipment/Service' },
  { key: 'shield', label: 'Shield', category: 'Equipment/Service' },
  { key: 'ivBag', label: 'IV Bag', category: 'Equipment/Service' },
  { key: 'hacker', label: 'Hacker', category: 'Equipment/Service' },
];

// per‑item defaults
const DEFAULT_COUNTS: Record<ItemKey, number> = {
  frag: 0,
  tq: 30,
  selfResTq: 20,
  shield: 1,
  ivBag: 1,
  hacker: 1,
  startingPoint: 1,
};
// control which items are enabled by default
const DEFAULT_ENABLED: Record<ItemKey, boolean> = {
  frag: false,
  tq: true,
  selfResTq: true,
  shield: true,
  ivBag: true,
  hacker: true,
  startingPoint: true,
};

type Setting = { enabled: boolean; count: number };
type SettingsState = Record<ItemKey, Setting>;

type Action = { type: 'TOGGLE_ENABLED'; key: ItemKey } | { type: 'SET_COUNT'; key: ItemKey; count: number };

function settingsReducer(state: SettingsState, action: Action): SettingsState {
  switch (action.type) {
    case 'TOGGLE_ENABLED': {
      const prev = state[action.key];
      return {
        ...state,
        [action.key]: {
          enabled: !prev.enabled,
          count: !prev.enabled ? state[action.key].count || DEFAULT_COUNTS[action.key] : 0,
        },
      };
    }
    case 'SET_COUNT': {
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          count: action.count,
        },
      };
    }
    default:
      return state;
  }
}

export default function ItemListScreen() {
  const { draft, setDraft } = useGame();
  const router = useRouter();

  // initialize from draft or fall back to DEFAULT_ENABLED/DEFAULT_COUNTS
  const initialSettings: SettingsState = ITEM_DEFS.reduce((acc, { key }) => {
    const prev = draft.maxPurchasesPerItem?.[key];
    if (typeof prev === 'number') {
      acc[key] = { enabled: prev > 0, count: prev };
    } else {
      acc[key] = {
        enabled: DEFAULT_ENABLED[key],
        count: DEFAULT_ENABLED[key] ? DEFAULT_COUNTS[key] : 0,
      };
    }
    return acc;
  }, {} as SettingsState);

  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  const onNext = () => {
    const maxPurchases: Record<string, number> = {};
    (Object.keys(settings) as ItemKey[]).forEach((key) => {
      if (settings[key].enabled) {
        maxPurchases[key] = settings[key].count;
      }
    });
    setDraft({
      ...draft,
      maxPurchasesPerItem: maxPurchases,
    });
    router.push('/game/classic/new/review');
  };

  const byCategory = ITEM_DEFS.reduce((acc, def) => {
    (acc[def.category] ||= []).push(def);
    return acc;
  }, {} as Record<string, typeof ITEM_DEFS>);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {(['Consumables', 'Equipment/Service'] as const).map((category) => (
          <View key={category} style={styles.section}>
            <ThemedText type="title" style={{ marginBottom: 20 }}>
              {category}
            </ThemedText>
            {byCategory[category].map(({ key, label }) => (
              <View key={key} style={styles.itemRow}>
                <View style={styles.labelBox}>
                  <ThemedCheckbox
                    value={settings[key].enabled}
                    onToggle={() => dispatch({ type: 'TOGGLE_ENABLED', key })}
                  />
                  <ThemedText type="subtitle">{label}</ThemedText>
                </View>
                <ThemedCounter
                  value={settings[key].count}
                  onChange={(n) => dispatch({ type: 'SET_COUNT', key, count: n })}
                  min={1}
                  max={20}
                  disabled={!settings[key].enabled}
                />
              </View>
            ))}
          </View>
        ))}

        <ThemedButton
          title="Next"
          onPress={onNext}
          style={{ alignSelf: 'center', width: '75%', aspectRatio: 10 }}
          textStyle={{ fontSize: 28 }}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    gap: 40,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  itemRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  labelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
});
