import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { formatBytes } from "../../utils/formatBytes";
import { Container, Content, Progress, Transferred } from "./styles";

export const Upload: React.FC = () => {
  const [image, setImage] = useState("");
  const [bytesTransferred, setBytesTransferred] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

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

      const uploadTask = reference.putFile(image);
      uploadTask.on("state_changed", snapshot => {
        const percentage = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);

        setUploadProgress(Number(percentage));

        setBytesTransferred(
          `${formatBytes(snapshot.bytesTransferred)} de ${formatBytes(
            snapshot.totalBytes,
          )} transferidos`,
        );
      });

      await uploadTask;
      Alert.alert("Upload", "Upload concluído com sucesso.");
    } catch (error) {
      console.warn(error);
      Alert.alert("Upload", "Não foi possível concluir upload.");
    }
  }

  return (
    <Container>
      <Header title="Upload de Imagens" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />
        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>{uploadProgress}%</Progress>
        <Transferred>{bytesTransferred}</Transferred>
      </Content>
    </Container>
  );
};
