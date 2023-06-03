import { StyleSheet } from 'react-native';
import { Roboto_400Regular } from "expo-font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  button: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius:3,
    backgroundColor: '#88c9bf',
    marginBottom: 150,
    marginTop: 24,
  },
  buttonText: {
    color: '#434343',
    textAlign: 'center'
  },
  opsText: {
    color: '#434343',
    fontFamily: Roboto_400Regular, 
    color: '#88c9bf',
    fontSize: 53,
    marginBottom: 52,
    marginTop: 52,
  },
  defaultText: {
    color: '#757575',
    fontSize: 14,
    fontFamily: Roboto_400Regular,
    marginBottom: 16,
  }
});

export default styles;
