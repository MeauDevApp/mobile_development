import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { getImageBase64 } from "../../../services/animal";
import AnimalCard from "../../components/animalCard";
import styles from "./styles.style";
import NoDataComponent from "../../components/noDataComponent";
import { getUserFavorites } from "../../../services/user_animal";
import { useSelector } from "react-redux";

const Favorites = ({ navigation }) => {
  const userStore = useSelector((state) => state.user);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const animalsData = await getUserFavorites(userStore.user.id);
          console.log(animalsData)
          const animalsWithImages = await Promise.all(
            animalsData.map(async (animal) => {
              var imageBase64 = "";
              if (animal.imageRef) {
                imageBase64 = await getImageBase64(animal.imageRef);
                console.log("imageBase64", imageBase64);
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

      return () => {
        fetchData();
      };
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
        <NoDataComponent entity={"animais"} />
      )}
    </ScrollView>
  );
};

export default Favorites;
