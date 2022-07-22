import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export const Routes: React.FC = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
