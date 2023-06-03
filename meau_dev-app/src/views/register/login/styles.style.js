import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  textInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 1,
    borderRightColor: '#fafafa',
    borderTopColor: '#fafafa',
    borderLeftColor: '#fafafa',
    borderBottomColor: 'grey',
    color: '#bdbdbd',
  },
  entrar: {
    width: '60%',
    height: 40,
    marginTop: 52,
    borderRadius: 3,
    backgroundColor: '#88c9bf',
    justifyContent: 'center',

  },
  facebook: {
    width: '60%',
    height: 40,
    marginTop: 72,
    borderRadius: 3,
    backgroundColor: '#194f7c',
    justifyContent: 'center',
    marginBottom: 8
  },
  google: {
    width: '60%',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#f15f5c',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default styles;
