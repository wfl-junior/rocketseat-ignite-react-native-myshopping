import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
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
    const reference = storage().ref(path);
    const [url, info] = await Promise.all([
      reference.getDownloadURL(),
      reference.getMetadata(),
    ]);

    setSelectedImage(url);
    setImageInfo(`Upload realizado em ${formatTimeCreated(info.timeCreated)}`);
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
