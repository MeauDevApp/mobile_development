import React from 'react';
import { Router } from './src/routes/router';
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import configureStore from './redux/store/configureStore';
import { useFonts, Courgette_400Regular } from "@expo-google-fonts/courgette"
import { Roboto_400Regular } from "@expo-google-fonts/roboto"

export default function App() {

  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
    Roboto_400Regular,
  })

  if(!fontsLoaded) return undefined;

  const store = configureStore();
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider >
  )
};
