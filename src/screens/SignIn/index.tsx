import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Account, Container, Subtitle, Title } from "./styles";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error: any) {
      let errorMessage = "Não foi possível entrar.";

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password": {
          errorMessage = "Credenciais inválidas.";
          break;
        }
        default: {
          console.warn(error);
        }
      }

      Alert.alert("Entrar", errorMessage);
    }
  }

  async function handleSignUp() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Cadastro", "Conta criada com sucesso.");
    } catch (error: any) {
      let errorMessage = "Não foi possível criar sua conta.";

      switch (error.code) {
        case "auth/email-already-in-use": {
          errorMessage = "Este e-mail já está cadastrado.";
          break;
        }
        case "auth/invalid-email": {
          errorMessage = "Este e-mail é inválido.";
          break;
        }
        case "auth/weak-password": {
          errorMessage = "A senha deve conter no mínimo 6 caracteres.";
          break;
        }
        default: {
          console.warn(error);
        }
      }

      Alert.alert("Cadastro", errorMessage);
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>Monte sua lista de compras para se organizar</Subtitle>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={handleSignUp} />
      </Account>
    </Container>
  );
};
