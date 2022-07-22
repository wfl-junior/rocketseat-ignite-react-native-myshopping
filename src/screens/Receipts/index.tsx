import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { File, FileProps } from "../../components/File";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { Container, PhotoInfo } from "./styles";

export const Receipts: React.FC = () => {
  const [images, setImages] = useState<FileProps[]>([]);

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

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri="" />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={images}
        keyExtractor={image => image.name}
        renderItem={({ item: image }) => (
          <File data={image} onShow={() => {}} onDelete={() => {}} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
};
