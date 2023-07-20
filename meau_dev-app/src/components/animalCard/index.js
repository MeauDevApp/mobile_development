import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles.style";
import { Ionicons } from "@expo/vector-icons";
import FavoriteHeart from "../favoriteHeart";
import { addAnimalToFavorites, removeAnimalFromFavorites } from "../../../services/user";
import { useSelector } from "react-redux";

const AnimalCard = ({ animal }) => {
  const userStore = useSelector((state) => state.user);

  const handleShare = () => {
    console.log("aqui");
  };

  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    console.log("Here mf");
    setIsFavorited(!isFavorited)
    if (!isFavorited) {
      addAnimalToFavorites(userStore.user.id, animal.id);
    } else {
      removeAnimalFromFavorites(userStore.user.id, animal.id);
    }
  };


  const animalPic = () => {
    return (
      <>
        {animal.imageBase64 && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={
              animal.imageBase64
                ? { uri: animal.imageBase64 }
                : require("../../../assets/images/image_not_found.jpg")
            }
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}> {animal.name} </Text>
          <TouchableOpacity onPress={() => handleShare()}>
            <Ionicons name="information-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {animalPic()}
        <TouchableOpacity onPress={handleFavoriteToggle} >
          <FavoriteHeart isLiked={isFavorited} />
        </TouchableOpacity>
        <Text style={styles.description}>3 NOVOS INTERESSADOS</Text>
        <Text style={styles.description}>APADRINHAMENTO | AJUDA</Text>
      </View>
    </View>
  );
};

export default AnimalCard;
