import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import { getImageBase64 } from "../../../services/animal";
import { getUserPets } from "../../../services/user_animal";
import AnimalCard from "../../components/animalCard";
import styles from "./styles.style";
import NoDataComponent from "../../components/noDataComponent";

const MyAnimals = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const animalsData = await getUserPets();

          const animalsWithImages = await Promise.all(
            animalsData.map(async (animal) => {
              var imageBase64 = "";
              if (animal.imageRef) {
                imageBase64 = await getImageBase64(animal.imageRef);
              }
              return { ...animal, imageBase64 };
            })
          );
          setAnimals(animalsWithImages);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {animals.length > 0 ? (
        animals.map((animal, index) => (
          <View key={index} style={styles.pets}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Informação Animal", {
                  animal: animal,
                  page: "myPetsPage",
                })
              }
            >
              <AnimalCard animal={animal} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <NoDataComponent entity={'animais'} />
      )}
    </ScrollView>
  );
};

export default MyAnimals;
