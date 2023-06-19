import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { HeaderBackButton } from '@react-navigation/stack';
import { verifyToken, signOut } from "../../services/user";
import DrawerNavigation from "./drawerNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export const Router = ({ navigation }) => {
  const userToken = useSelector((state) => state.token);
  const navigationState = useNavigationState((state) => state);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyUserToken = async () => {
      const tokenIsValid = true;
      // const tokenIsValid = await verifyToken(userToken);
      setIsValidToken(tokenIsValid);
    };

    verifyUserToken();
  }, [userToken, navigationState]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Drawer">
        {(props) => <DrawerNavigation {...props} isValidToken={isValidToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
