import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connect } from 'react-redux';
import { storeToken } from '../../../../redux/actions/storeToken';
import { storeUser } from '../../../../redux/actions/storeUser';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles.style';
import { get } from '../../../../services/user';

const Login = ({ navigation, actions }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState({});

  const authErrorAlert = () => {
    Alert.alert('Erro de autenticação', 'Usuário não existe', 
    [ {text: 'OK', onPress: () => console.log('OK Pressed')} ]);
  };

  const storeUserRedux = async (userCredential) => {
    try {
      console.log(storeUserRedux);
      console.log(userCredential.user.uid);
      const user = await get(userCredential.user.uid);
      console.log(user)
      console.log(actions.storeUser(user))
      actions.storeUser(user);
    }
    catch(error) {
      console.log(error);
    }
  };

  const loginFireBase = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.user.accessToken;
        console.log(actions.storeToken(token))
        actions.storeToken(token);
        navigation.navigate('Home');
        storeUserRedux(userCredential);
      })
      .catch((error) => {
        setErrorLogin(error);
        console.log(error);
        authErrorAlert();
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        type="text"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='Senha'
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={text => setPassword(text)}
        value={password} />
      <TouchableOpacity
        style={styles.entrar}
        onPress={() => loginFireBase()}
      >
        <Text style={{ color: '#434343', textAlign: 'center', fontSize: 10 }} >ENTRAR </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, marginStart: 8 }} >ENTRAR COM FACEBOOK </Text>
        <Icon style={{ position: 'absolute', color: 'white', marginStart: 30 }} name='facebook' size={15} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.google} >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }} >ENTRAR COM GOOGLE </Text>
        <Icon style={{ position: 'absolute', color: 'white', marginStart: 30 }} name='google-' size={15} />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

const ActionCreators = {
  storeToken,
  storeUser
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
