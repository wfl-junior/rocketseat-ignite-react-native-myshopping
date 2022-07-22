import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { Container, Content, Progress, Transferred } from "./styles";

export const Upload: React.FC = () => {
  const [image, setImage] = useState("");

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleUpload() {
    try {
      const fileName = Date.now();
      const imageExtension = image.split(".").pop() || "png";
      const reference = storage().ref(`/images/${fileName}.${imageExtension}`);

      await reference.putFile(image);
      Alert.alert("Upload", "Upload concluído com sucesso.");
    } catch (error) {
      console.warn(error);
      Alert.alert("Upload", "Não foi possível concluir upload.");
    }
  }

  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>0%</Progress>

        <Transferred>0 de 100 bytes transferido</Transferred>
      </Content>
    </Container>
  );
};
