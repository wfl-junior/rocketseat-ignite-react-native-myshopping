import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { File, FileProps } from "../../components/File";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { formatTimeCreated } from "../../utils/formatTimeCreated";
import { Container, PhotoInfo } from "./styles";

export const Receipts: React.FC = () => {
  const [images, setImages] = useState<FileProps[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageInfo, setImageInfo] = useState("");

  useEffect(() => {
    storage()
      .ref("/images")
      .list()
      .then(result => {
        const files = result.items.map(
          (file): FileProps => ({
            name: file.name,
            path: file.fullPath,
          }),
        );

        setImages(files);
      })
      .catch(console.warn);
  }, []);

  async function handleShowImage(path: FileProps["path"]) {
    try {
      const reference = storage().ref(path);
      const [url, info] = await Promise.all([
        reference.getDownloadURL(),
        reference.getMetadata(),
      ]);

      setSelectedImage(url);
      setImageInfo(
        `Upload realizado em ${formatTimeCreated(info.timeCreated)}`,
      );
    } catch (error) {
      console.warn(error);
      Alert.alert("Upload", "Não foi possível buscar informações do arquivo.");
    }
  }

  async function handleDeleteImage(path: FileProps["path"]) {
    try {
      await storage().ref(path).delete();

      setImages(images => {
        return images.filter(image => image.path !== path);
      });

      Alert.alert("Upload", "Arquivo removido com sucesso.");
    } catch (error) {
      console.warn(error);
      Alert.alert("Upload", "Não foi possível remover arquivo.");
    }
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={selectedImage} />

      <PhotoInfo>{imageInfo}</PhotoInfo>

      <FlatList
        data={images}
        keyExtractor={image => image.name}
        renderItem={({ item: image }) => (
          <File
            data={image}
            onShow={() => handleShowImage(image.path)}
            onDelete={() => handleDeleteImage(image.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
};
