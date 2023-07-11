
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from "./styles.style";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loading;
