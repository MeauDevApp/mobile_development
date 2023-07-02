import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles.style";
import { TouchableOpacity } from "react-native-gesture-handler";

const AnimalCard = ({ animal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterCard} >
        <Text style={styles.title}>Espécie</Text>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'dog')}>
          <Text style={styles.buttonText}>Cachorro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'cat')}>
          <Text style={styles.buttonText}>Gato</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterCard} >
        <Text style={styles.title}>Sexo</Text>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'male')}>
          <Text style={styles.buttonText}>Macho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'female')}>
          <Text style={styles.buttonText}>Fêmea</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterCard} >
        <Text style={styles.title}>Idade</Text>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'puppy')}>
          <Text style={styles.buttonText}>Filhote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'adult')}>
          <Text style={styles.buttonText}>Adulto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => searchAdoptionAnimals('specie', 'old')}>
          <Text style={styles.buttonText}>Idoso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimalCard;
