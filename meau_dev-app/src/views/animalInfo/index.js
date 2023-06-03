import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles.style";

const AnimalInfo = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  console.log(route.params);
  const animal = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text>{animal.name}</Text>
    </ScrollView>
  );
};

export default AnimalInfo;
