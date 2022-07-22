import auth from "@react-native-firebase/auth";
import React from "react";
import { Alert } from "react-native";
import { ButtonIcon } from "../ButtonIcon";
import { Container, Title } from "./styles";

type Props = {
  title: string;
  showLogoutButton?: boolean;
};

export const Header: React.FC<Props> = ({
  title,
  showLogoutButton = false,
}) => {
  async function handleSignOut() {
    try {
      await auth().signOut();
    } catch (error) {
      console.warn(error);
      Alert.alert("Sair", "Não foi possível sair.");
    }
  }

  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>{title}</Title>

      {showLogoutButton && (
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: 20 }}
          onPress={handleSignOut}
        />
      )}
    </Container>
  );
};
