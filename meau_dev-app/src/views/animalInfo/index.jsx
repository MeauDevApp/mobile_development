import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Image, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { getByName, remove } from "../../../services/animal";
import { update } from "../../../services/animal";
import styles from "./styles.style";

const AnimalInfo = ({ route, navigation }) => {
  const animal = route.params.animal;
  const page = route.params.page;

  const [loading, setLoading] = useState(true);
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
  const [toBeAdopted, setToBeAdopted] = useState('');
  const [dataFetched, setDataFetched] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const animalsData = await getByName(animal.name)
          console.log(animalsData)
          setAnimalDetails(animalsData[0])
          setAnimalId(animalsData[1]);
          setLoading(false);
          setDataFetched(true);
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData();
    }, [dataFetched])
  );

  function setAnimalDetails(animal) {
    console.log("entrou", animal)
    setAge(animal.age);
    setSize(animal.size);
    setGender(animal.gender);
    setToBeAdopted(animal.toBeAdopted);
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

  const handleAdoptPet = () => {
    console.log('handleAdoptPet');
  };

  const renderAdoptButton = () => {
    if (page == "adoptionAnimalPage") {
      return (
        <TouchableOpacity style={styles.button} onPress={handleAdoptPet}>
          <Text style={styles.buttonText}>Adotar pet</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderRemoveButton = () => {
    if (!(page == "adoptionAnimalPage")) {
      return (
        <TouchableOpacity style={styles.button} onPress={handleRemovePet}>
          <Text style={styles.buttonText}>Remover Pet</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderAdoptionButton = () => {
    if (!toBeAdopted) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => update(animalId, "toBeAdopted")}>
          <Text style={styles.buttonText}>Colocar para adoção</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderInteresteds = () => {
    if (toBeAdopted) {
      return (
        <TouchableOpacity style={styles.button} onPress={handleInterested}>
          <Text style={styles.buttonText}>Ver interessados</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: animal.imageBase64 }} />
        <Text style={styles.namePet}>{animal.name}</Text>
        <SafeAreaView style={styles.alingItems}>
          <View style={styles.column}>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.content}>{gender}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Porte</Text>
            <Text style={styles.content}>{size}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Idade</Text>
            <Text style={styles.content}>{age}</Text>
          </View>
        </SafeAreaView>
        <SafeAreaView>
          <View style={styles.column}>
            <Text style={styles.label}>Localização</Text>
            <Text style={styles.content}>TODO</Text>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.alingItems}>
          <View style={styles.column}>
            <Text style={styles.label} >Castrado</Text>
            <Text style={styles.content}>{castrated ? 'Sim' : 'Não'}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Vermificado</Text>
            <Text style={styles.content}>{dewormed ? 'Sim' : 'Não'}</Text>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.alingItems}>
          <View style={styles.column}>
            <Text style={styles.label}>Vacinado</Text>
            <Text style={styles.content}>{vaccinated ? 'Sim' : 'Não'}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Doenças</Text>
            <Text style={styles.content}>{sick ? 'Sim' : 'Não'}</Text>
          </View>
        </SafeAreaView>
        <View style={styles.column}>
          <Text style={styles.label}>Temperamento</Text>
          <Text style={styles.content}>{playful}, {calm}, {shy}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>O {animal.name} precisa de</Text>
          <Text style={styles.content}>TODO</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Exigências do doador</Text>
          <Text style={styles.content}>TODO</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Mais sobre {animal.name}</Text>
          <Text style={styles.content}>TODO</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {dataFetched && renderRemoveButton()}
        {dataFetched && renderAdoptionButton()}
        {dataFetched && renderInteresteds()}
        {dataFetched && renderAdoptButton()}
      </View>
    </ScrollView>
  );
};

export default AnimalInfo;