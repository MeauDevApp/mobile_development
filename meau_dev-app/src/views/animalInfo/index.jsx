import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Image, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { getByName, remove as removeAnimal, removeAdoptionPet, updatedInterested } from "../../../services/animal";
import { update } from "../../../services/animal";
import CustomModal from "../../components/modal";
import styles from "./styles.style";
import { getCurrentUser, getInterestedPeople, sendInterestMessage } from "../../../services/user";
import * as Notifications from 'expo-notifications';
import { showMessage } from 'react-native-flash-message';

const AnimalInfo = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const array = ['Value 1', 'Value 2', 'Value 3'];

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
  const [interestedPeople, setInterestedPeople] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const animalsData = await getByName(animal.name)
          setAnimalDetails(animalsData[0])
          setAnimalId(animalsData[1]);
          setDataFetched(true);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData();
    }, [dataFetched, animal])
  );

  const setAnimalDetails = (animal) => {
    console.log(animal)
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
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleWithDrawPet = () => {
    try {
      removeAdoptionPet(animalId);
      setLoading(true);
      setDataFetched(false);
      showMessage({
        message: 'Animal removido da lista de animais para adoção',
        description: 'Remoção sucedida!',
        type: 'success',
      });
    }
    catch(error) {
      showMessage({
        message: 'Animal removido da lista de animais para adoção',
        description: 'Remoção sucedida!',
        type: 'info'
      });
    }
  };
  const handleRemovePet = (animalId) => {
    try {
      removeAnimal(animalId);
      showMessage({
        message: 'Animal removido da lista de animais para adoção',
        description: 'Remoção sucedida!',
        type: 'success',
      });
    }
    catch(error) {
      showMessage({
        message: 'Animal removido da lista de animais para adoção',
        description: 'Remoção sucedida!',
        type: 'info',
      });

    }
  };

  const handleUpdate = () => {
    try {
      update(animalId, "toBeAdopted");
      setLoading(true);
      setDataFetched(false);
      showMessage({
        message: 'Animal adicionado à lista de animais para adoção registrado',
        description: 'A criação do pedido foi um sucesso!',
        type: 'success',
      });
    }
    catch(error) {
      showMessage({
        message: 'Animal adicionado à lista de animais para adoção registrado',
        description: 'A criação do pedido foi um sucesso!',
        type: 'info',
      });

    }
  };

  const handleAdoptPet = () => {
    console.log('handleAdoptPet');
    try {
      updatedInterested(animalId);
      showMessage({
        message: 'Seu pedido de adoção foi registrado',
        description: 'A criação do pedido foi um sucesso!',
        type: 'success',
      });
      sendInterestMessage(animal.name, animal.user_id);
      handleCallNotification()
    }
    catch(error) {
      showMessage({
        message: 'Seu pedido de adoção foi registrado',
        description: 'A criação do pedido foi um sucesso!',
        type: 'info',
      });

    }
  };

  async function handleCallNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    if(status != 'granted') {
      alert('No permition');
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync({
      projectId: '2b293a45-c07c-449f-921a-512e786a6785'
    })).data;
    console.log("token", token)
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Adoção ${animal.name}`,
        body: "Tenho interesse em adotar seu pet",
        
      },
      trigger: null,
    });
}

  const handleInterested = () => {
    setModalVisible(true);
  };

  const renderAdoptButton = () => {
    if (page == "adoptionAnimalPage") {
      return (
        <TouchableOpacity style={styles.button} onPress={handleAdoptPet 
        // && 
        // handleCallNotification
        }>
          <Text style={styles.buttonText}>Adotar pet</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderRemoveButton = () => {
    if (!(page == "adoptionAnimalPage")) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => handleRemovePet(animalId)}>
          <Text style={styles.buttonText}>Remover Pet</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderTakeOffButton = () => {
    if (!(page == "adoptionAnimalPage")) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => handleWithDrawPet()}>
          <Text style={styles.buttonText}>Retirar da adoção</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderAdoptionButton = () => {
    if (!toBeAdopted) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => handleUpdate()}>
          <Text style={styles.buttonText}>Colocar para adoção</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderInteresteds = () => {
    if (toBeAdopted) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => handleInterested()}>
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
        {dataFetched && renderTakeOffButton()}
        <CustomModal visible={modalVisible} userIds={animal.interestedPeople} onClose={closeModal} imageArray={true} />
      </View>
    </ScrollView>
  );
};

export default AnimalInfo;
