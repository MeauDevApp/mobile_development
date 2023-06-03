import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./home.style";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.olaText}>Olá!</Text>
      <Text style={styles.textCenter}>
        Bem vindo ao Meau! {"\n"}
        Aqui você pode adotar e ajudar {"\n"} cães e gatos com facilidade.{" "}
        {"\n"}
        Qual seu interesse?
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>ADOTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate("Cadastro Animal")}
        >
          CADASTRAR ANIMAL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.login}>login</Text>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo/Meau_marca_2.png")}
      />
    </View>
  );
};

export default HomeScreen;
