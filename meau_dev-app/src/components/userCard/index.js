import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles.style";

const UserCard = ({ user, lastMessage }) => {
  return (
    <View style={styles.container}>
      {user.imageBase64 !== "" ? (
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: user.imageBase64 }} />
          <Text style={styles.name}> {user.name} </Text>
          <View style={styles.lastMessage}>
            <Text>{lastMessage}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/image_not_found.jpg")}
          />
          <Text> {user.name} </Text>
          <View style={styles.lastMessage}>
            <Text>{lastMessage}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserCard;
