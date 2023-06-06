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
  const [dewormed, setDewormed] = useState(false);
  const [castrated, setCastrated] = useState(false);
  const [sick, setSick] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [playful, setPlayful] = useState('');
  const [shy, setShy] = useState('');
  const [calm, setCalm] = useState('');


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
    console.log("entrou")
    setAge(animal.age);
    setSize(animal.size);
    setGender(animal.gender);
    animal.health.forEach((h) => {
      if (h == "Vermifugado") setDewormed(true)
      if (h == "Castrado") setCastrated(true)
      if (h == "Doente") setSick(true)
      if (h == "Vacinado") setVaccinated(true)
    })
    animal.temperance.forEach((t) => {
      if (t == "Brincalhão") setPlayful(t)
      if (t == "Tímido") setShy(t)
      if (t == "Calmo") setCalm(t)
    })
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
          <Text style={styles.content}>{castrated ? 'Sim' : 'Não'}</Text>
        </View>
        <View>
          <Text style={styles.label}>Vermificado</Text>
          <Text style={styles.content}>{dewormed ? 'Sim' : 'Não'}</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.alingItems}>
        <View>
          <Text style={styles.label}>Vacinado</Text>
          <Text style={styles.content}>{vaccinated ? 'Sim' : 'Não'}</Text>
        </View>
        <View>
          <Text style={styles.label}>Doenças</Text>
          <Text style={styles.content}>{sick ? 'Sim' : 'Não'}</Text>
        </View>
      </SafeAreaView>
      <View >
        <Text style={styles.label}>Temperamento</Text>
        <Text style={styles.content}>{playful}, {calm}, {shy}</Text>
        <Text style={styles.label}>O {animal.name} precisa de</Text>
        <Text style={styles.content}>TODO</Text>
        <Text style={styles.label}>Exigências do doador</Text>
        <Text style={styles.content}>TODO</Text>
        <Text style={styles.label}>Mais sobre {animal.name}</Text>
        <Text style={styles.content}>TODO</Text>

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
