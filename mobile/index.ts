import { registerRootComponent } from 'expo';
import { Buffer } from 'buffer';

import App from './App';

if (!(global as any).Buffer) {
  (global as any).Buffer = Buffer;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
