import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/reducers';
import PostScreen from './src/screens/PostScreen';
import UserScreen from './src/screens/UserScreen';
import PostsListScreen from './src/screens/PostsListScreen';

const Stack = createStackNavigator();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Posts" component={PostsListScreen} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="User" component={UserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;