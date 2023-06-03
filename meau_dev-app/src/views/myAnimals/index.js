import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, ActivityIndicator } from "react-native";
import { getImageBase64 } from "../../../services/animal";
import { getUserPets } from "../../../services/user_animal";
import AnimalCard from "../../components/animalCard"
import styles from "./styles.style";

const MyAnimals = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalsData = await getUserPets();

        const animalsWithImages = await Promise.all(
          animalsData.map(async (animal) => {
            var imageBase64 = '';
            if (animal.imageRef) {
              imageBase64 = await getImageBase64(animal.imageRef);
            } 
              return { ...animal, imageBase64 };
          })
        )
        setAnimals(animalsWithImages);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {animals.length > 0 && animals.map((animal, index) => (
        <View key={index} style={styles.pets}>
          <AnimalCard animal={animal} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MyAnimals;
