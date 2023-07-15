import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonConfirmation: {
    width: '30%',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#4AA96C',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonDisapproval: {
    width: '30%',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#F55C47',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonChat: {
    width: '30%',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#4A55A2',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#F5F5F5', 
    textAlign: 'center', 
    fontSize: 14 
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 10,
    color: '#000000', 
  },
});

export default styles;
