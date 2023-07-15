import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles.style";
import { Ionicons } from "@expo/vector-icons";
import FavoriteHeart from "../favoriteHeart";

const AnimalCard = ({ animal }) => {
  const handleShare = () => {
    console.log("handleShare");
  };

  return (
    <View style={styles.container}>
      {animal.imageBase64 !== "" ? (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}> {animal.name} </Text>
            <TouchableOpacity onPress={() => handleShare()}>
              <Ionicons name="information-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.image}
            source={{ uri: animal.imageBase64 }}
            resizeMode="cover"
          />
          <FavoriteHeart />
          <Text style={styles.description}>3 NOVOS INTERESSADOS</Text>
          <Text style={styles.description}>APADRINHAMENTO | AJUDA</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/image_not_found.jpg")}
            resizeMode="contain"
          />
          <Text> {animal.name} </Text>
          <Text style={styles.description}>3 NOVOS INTERESSADOS</Text>
          <Text style={styles.description}>APADRINHAMENTO | AJUDA</Text>
        </View>
      )}
    </View>
  );
};

export default AnimalCard;
