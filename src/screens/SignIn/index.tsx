import auth from "@react-native-firebase/auth";
import React from "react";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Account, Container, Subtitle, Title } from "./styles";

export const SignIn: React.FC = () => {
  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>Monte sua lista de compras para se organizar</Subtitle>

      <Input placeholder="E-mail" keyboardType="email-address" />

      <Input placeholder="Senha" secureTextEntry />

      <Button title="Entrar" onPress={handleSignInAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={() => {}} />
      </Account>
    </Container>
  );
};
