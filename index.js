import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import AppContainer from './src/AppContainer';
import { name as appName } from './app.json';
console.disableYellowBox = true;


AppRegistry.registerComponent(appName, () => AppContainer);
