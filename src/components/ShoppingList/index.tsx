import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Product, ProductProps } from "../Product";
import { styles } from "./styles";

export const ShoppingList: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection<ProductProps>("products")
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(document => ({
          ...document.data(),
          id: document.id,
        }));

        setProducts(data);
      }, console.warn);

    return subscriber;
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={product => product.id}
      renderItem={({ item: product }) => <Product data={product} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
};
