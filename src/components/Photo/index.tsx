import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import {
  Container,
  EmptyPhotoContainer,
  EmptyPhotoText,
  Image,
} from "./styles";

type Props = TouchableOpacityProps & {
  uri?: string;
};

export const Photo: React.FC<Props> = ({ uri, ...props }) => (
  <TouchableOpacity activeOpacity={0.8} {...props}>
    <Container>
      {uri ? (
        <Image source={{ uri }} />
      ) : (
        <EmptyPhotoContainer>
          <EmptyPhotoText>Nenhuma imagem selecionada</EmptyPhotoText>
        </EmptyPhotoContainer>
      )}
    </Container>
  </TouchableOpacity>
);
