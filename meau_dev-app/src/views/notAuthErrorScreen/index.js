import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles.style';

const NotAuthErrorScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.opsText}>
        Ops !
      </Text>
      <Text style={styles.defaultText}>Você não pode realizar esta ação sem possuir um cadastro.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro Pessoal')} >
          <Text style={styles.buttonText} >Fazer Cadastro </Text>
        </TouchableOpacity>
      <Text style={styles.defaultText}>Já possui cadastro?.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
          <Text style={styles.buttonText} >Fazer Login </Text>
        </TouchableOpacity>
    </View>
  );
};

export default NotAuthErrorScreen;
