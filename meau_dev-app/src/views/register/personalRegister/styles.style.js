import { StyleSheet } from 'react-native';
import { Roboto_400Regular } from "expo-font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    color: '#bdbdbd',
    marginTop: 28,
    borderRightColor: '#fafafa',
    borderTopColor: '#fafafa',
    borderLeftColor: '#fafafa',
    borderBottomColor: 'grey',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:3,
    height: 34,
    backgroundColor: '#88c9bf',
    marginBottom: 24,
    marginTop: 24,
  },
  buttonText: {
    color: '#434343',
    textAlign: 'center'
  },
  textInfo: {
    marginTop: 28,
    height: 80,
    width: 320,
    backgroundColor: '#cfe9e5',
    color: '#434343',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Roboto_400Regular
  },
  registerTitle: {
    marginTop: 28,
    color: '#88c9bf',
    marginBottom: 32,
  },
});

export default styles;
