import { StyleSheet } from 'react-native';
import { Roboto_400Regular } from "expo-font";

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Roboto_400Regular,
    color: "#434343",
    fontSize: '12pt'
  },
  greenButton: {
    width: '60%',
    color: '#88c9bf',
    height: 40,
    marginTop: 52,
    borderRadius:3,
    backgroundColor: '#88c9bf',
    justifyContent: 'center',
  },
  default: {
    width: '60%',
    height: 40,
    marginTop: 52,
    borderRadius:3,
    backgroundColor: '#88c9bf',
    justifyContent: 'center',
  },
});

export default styles;
