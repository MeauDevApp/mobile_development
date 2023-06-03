import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  olaText: {
    fontFamily: "Courgette_400Regular",
    color: '#ffd358',
    fontSize: 53,
    marginBottom: 52,
  },
  textCenter: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    color: '#757575',
  },
  button: {
    width: '70%',
    height: 40,
    marginTop: 18,
    borderRadius: 3,
    backgroundColor: '#ffd358',
    justifyContent: 'center',
  },
  textButton: {
    fontFamily: "Roboto_400Regular",
    color: '#434343',
    textAlign: 'center',
    fontSize: 15,
  },
  login: {
    marginTop: 40,
    color: '#88c9bf',
    fontSize: 17,
  },
  logo: {
    marginTop: 95,
    resizeMode: 'contain',
    height: 100,
    width: 200
  }
});

export default styles;
