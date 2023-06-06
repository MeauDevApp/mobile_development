import React, { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./styles.style";
import { getByName, remove } from "../../../services/animal";

const AnimalInfo = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const animal = route.params;
  const [animalId, setAnimalId] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [temperance, setTemperance] = useState([]);
  const [guard, setGuard] = useState([]);
  const [health, setHealth] = useState([]);
  const [vaccinated, setVaccinated] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalsData = await getByName(animal.name)
        console.log(animalsData)
        setAnimalDetails(animalsData[0])
        setAnimalId(animalsData[1]);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData();
  }, []);

  function setAnimalDetails(animal) {
    setAge(animal.age);
    setSize(animal.size);
    setGender(animal.gender);
    setTemperance(animal.temperance);
    setHealth(animal.health);
  }
  const handleInterested = () => {
    // todo
  };

  const handleRemovePet = () => {
    // remove(animalId);
    // navigation.navigate('Meus Pets')
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: animal.imageBase64 }} />
      <Text style={styles.namePet}>{animal.name}</Text>
      <SafeAreaView style={styles.alingItems}>
        <View>
          <Text style={styles.label}>Sexo</Text>
          <Text style={styles.content}>{gender}</Text>
        </View>
        <View>
          <Text style={styles.label}>Porte</Text>
          <Text style={styles.content}>{size}</Text>
        </View>
        <View>
          <Text style={styles.label}>Idade</Text>
          <Text style={styles.content}>{age}</Text>
        </View>
      </SafeAreaView>
      <Text style={styles.label}>Localização</Text>
      <Text style={styles.content}>TODO</Text>
      <SafeAreaView style={styles.alingItems}>
        <View >
          <Text style={styles.label} >Castrado</Text>
          <Text style={styles.content}></Text>
        </View>
        <View>
          <Text style={styles.label}>Vermificado</Text>
          <Text style={styles.content}></Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.alingItems}>
        <View>
          <Text style={styles.label}>Vacinado</Text>
          <Text style={styles.content}>Sim</Text>
        </View>
        <View>
          <Text style={styles.label}>Doenças</Text>
          <Text style={styles.content}>Doenças</Text>
        </View>
      </SafeAreaView>
      <View >
        <Text style={styles.label}>Temperamento</Text>
        <Text style={styles.content}></Text>

        <Text style={styles.label}>O {animal.name} precisa de</Text>
        <Text style={styles.content}>O {animal.name} precisa de</Text>

        <Text style={styles.label}>Exigências do doador</Text>
        <Text style={styles.content}>Exigências do doador</Text>

        <Text style={styles.label}>Mais sobre {animal.name}</Text>
        <Text style={styles.content}>Mais sobre {animal.name}</Text>

      </View>
      <View style={styles.alingItems}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver interessados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => handleRemovePet()}>Remover Pet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AnimalInfo;
