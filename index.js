import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {name as appName} from './app.json';
import reduxStore from './src/redux/reducer/index';
import {PersistGate} from 'redux-persist/integration/react';
import {setupHttpConfig} from './src/utils/http';
import 'react-native-gesture-handler';
export default App = () => {
  const {store, persistor} = reduxStore();
  useEffect(() => {
    setupHttpConfig();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
