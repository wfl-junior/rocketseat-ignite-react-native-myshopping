import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { File, FileProps } from "../../components/File";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { Container, PhotoInfo } from "./styles";

export const Receipts: React.FC = () => {
  const [images, setImages] = useState<FileProps[]>([]);
  const [selectedImage, setSelectedImage] = useState("");

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
    const imageUrl = await storage().ref(path).getDownloadURL();
    setSelectedImage(imageUrl);
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={selectedImage} />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={images}
        keyExtractor={image => image.name}
        renderItem={({ item: image }) => (
          <File
            data={image}
            onShow={() => handleShowImage(image.path)}
            onDelete={() => {}}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
};
