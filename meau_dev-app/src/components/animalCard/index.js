import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles.style";
import { Ionicons } from "@expo/vector-icons";
import FavoriteHeart from "../favoriteHeart";

const AnimalCard = ({ animal }) => {
  const handleShare = () => {
    console.log("aqui", animal.imageBase64);
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
        <FavoriteHeart />
        <Text style={styles.description}>3 NOVOS INTERESSADOS</Text>
        <Text style={styles.description}>APADRINHAMENTO | AJUDA</Text>
      </View>
    </View>
  );
};

export default AnimalCard;
