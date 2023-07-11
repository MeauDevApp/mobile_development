import React from "react";
import { Router } from "./src/routes/router";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import configureStore from "./redux/store/configureStore";
import { useFonts, Courgette_400Regular } from "@expo-google-fonts/courgette";
import FlashMessage from "react-native-flash-message";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
    Roboto_400Regular,
  });

  if (!fontsLoaded) return undefined;

  const theme = {
    ...DefaultTheme,
    // Add your custom theme configurations here
  };

  const store = configureStore();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <FlashMessage position="top" />
      </PaperProvider>
    </Provider>
  );
}
