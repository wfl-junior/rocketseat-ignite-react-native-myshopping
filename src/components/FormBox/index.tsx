import firestore from "@react-native-firebase/firestore";
import React, { useState } from "react";
import { Alert } from "react-native";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import { Container } from "./styles";

export const FormBox: React.FC = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleAddProduct() {
    try {
      await firestore()
        .collection("products")
        .add({
          description,
          quantity: Number(quantity),
          done: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setDescription("");
      setQuantity("");

      // Alert.alert("Produto", "Produto adicionado com sucesso.");
    } catch (error) {
      console.warn(error);
      Alert.alert("Produto", "Não foi possível adicionar produto.");
    }
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        value={quantity}
        onChangeText={setQuantity}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleAddProduct}
      />
    </Container>
  );
};
