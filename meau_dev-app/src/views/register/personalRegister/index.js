import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { create as createUser } from '../../../../services/user';
import { ref, uploadString } from 'firebase/storage';
import { storage } from '../../../../database/firebaseDb';
import AddPhoto from '../../../components/addPhoto';

import styles from './styles.style';

const PersonalRegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [user, setUser] = useState({});
  const [file, setFile] = useState({ imagePath: 'animals/', base64: '' });

  const handleRegister = () => {
    const aleatoryNumber = getRandomNumber(0, 10000);
    const imageRef = file.imagePath + name + aleatoryNumber;
    const user = { name, username,  age,  password, email, city, phone, address, state, imageRef } 

    createUser(user);
    sendPhoto(imageRef);
    cleanUserFields();
  };

  const sendPhoto = async (imageRef) => {
    await uploadString(ref(storage, imageRef), file.base64, 'base64')
    .then((snapshot) => {
        console.log('File uploaded successfully!');
    }).catch((error) => {
        console.error('Error uploading file:', error);
    });
  };

  const cleanUserFields = () => {
    setName('');
    setUsername('');
    setAge('');
    setPassword('');
    setEmail('');
    setCity('');
    setPhone('');
    setAddress('');
    setState('');
    setUser({});
  };

  const handleImageChange = (image) => {
    setFile(previous => ({
      ...previous,
      ...{ base64: image }
    }));
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.textInfo}>As informações preenchidas serão divulgadas apenas para a pessoa com a qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
        </View>
        <Text style={styles.registerTitle}> INFORMAÇÕES PESSOAIS</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Numero"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          />
        <Text style={styles.registerTitle}>Foto de perfil</Text>
        <AddPhoto onValueChange={handleImageChange} />
        {/* <Button needAuth="true" text="Fazer Cadastro" type="greenButton" /> */}
        <TouchableOpacity style={styles.button}
          onPress={() => {handleRegister(), navigation.navigate('Home')}} >
          <Text style={styles.buttonText} >Fazer Cadastro </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalRegisterScreen;
