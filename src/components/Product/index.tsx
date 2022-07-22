import firestore from "@react-native-firebase/firestore";
import React from "react";
import { Alert } from "react-native";
import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Options, Quantity, Title } from "./styles";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export const Product: React.FC<Props> = ({ data }) => {
  async function handleToggleDone() {
    try {
      await firestore()
        .collection<ProductProps>("products")
        .doc(data.id)
        .update({ done: !data.done });
    } catch (error) {
      console.warn(error);
      Alert.alert("Produto", "Não foi possível alterar produto.");
    }
  }

  async function handleDeleteProduct() {
    try {
      await firestore()
        .collection<ProductProps>("products")
        .doc(data.id)
        .delete();
    } catch (error) {
      console.warn(error);
      Alert.alert("Produto", "Não foi possível deletar produto.");
    }
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleToggleDone}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  );
};
