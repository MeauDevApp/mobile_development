import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles.style";

const AnimalCard = ({ animal }) => {
  return (
    <View style={styles.container}>
      {animal.imageBase64 !== "" ? (
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: animal.imageBase64 }} />
          <Text style={styles.name}> {animal.name} </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Image style={styles.image} source={require('../../../assets/images/image_not_found.jpg')} />
          <Text> {animal.name} </Text>
        </View>
      )}
    </View>
  );
};

export default AnimalCard;
