import React from "react";
import { FormBox } from "../../components/FormBox";
import { Header } from "../../components/Header";
import { ShoppingList } from "../../components/ShoppingList";
import { Container } from "./styles";

export const Products: React.FC = () => (
  <Container>
    <Header title="Lista de compras" showLogoutButton />
    <FormBox />
    <ShoppingList />
  </Container>
);
