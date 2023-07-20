import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { verifyToken } from "../../services/user";
import DrawerNavigation from "./drawerNavigation";

const Stack = createNativeStackNavigator();

export const Router = ({ navigation }) => {
  const userToken = useSelector((state) => state.token);
  const navigationState = useNavigationState((state) => state);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyUserToken = async () => {
      const tokenIsValid = await verifyToken(userToken);
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
