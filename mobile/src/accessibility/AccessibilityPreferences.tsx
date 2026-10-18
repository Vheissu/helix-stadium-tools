import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Platform, type ViewInstance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LayoutPreference = 'automatic' | 'list' | 'visual';
const STORAGE_KEY = 'helyon.accessibility.layout';
const Context = createContext({
  preference: 'automatic' as LayoutPreference, screenReader: false, reduceMotion: false,
  accessibleLayout: false, setPreference: (_value: LayoutPreference) => {},
});
export const useAccessibilityPreferences = () => useContext(Context);
export const announce = (message: string, queue = true) => {
  if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibilityWithOptions(message, { queue });
  else AccessibilityInfo.announceForAccessibility(message);
};

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preference, updatePreference] = useState<LayoutPreference>('automatic');
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const changed = useRef(false);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let alive = true;
    let readerEvent = false;
    let motionEvent = false;
    const reader = AccessibilityInfo.addEventListener('screenReaderChanged', (value) => { readerEvent = true; setScreenReader(value); });
    const motion = AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => { motionEvent = true; setReduceMotion(value); });
    void AccessibilityInfo.isScreenReaderEnabled().then((value) => { if (alive && !readerEvent) setScreenReader(value); }).catch(() => {});
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => { if (alive && !motionEvent) setReduceMotion(value); }).catch(() => {});
    void AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (alive && !changed.current && (value === 'automatic' || value === 'list' || value === 'visual')) updatePreference(value);
    }).catch(() => {});
    return () => { alive = false; reader.remove(); motion.remove(); };
  }, []);
  const setPreference = (value: LayoutPreference) => {
    changed.current = true;
    updatePreference(value);
    writes.current = writes.current.then(() => AsyncStorage.setItem(STORAGE_KEY, value)).catch(() => {
      announce('Layout changed for this session. Could not save your preference.');
    });
  };
  return <Context.Provider value={{ preference, setPreference, screenReader, reduceMotion,
    accessibleLayout: preference === 'list' || (preference === 'automatic' && screenReader),
  }}>{children}</Context.Provider>;
}

let lastAction: ViewInstance | null = null;
export function rememberAction(view: ViewInstance | null) { lastAction = view; }
export function getLastAction() { return lastAction; }
