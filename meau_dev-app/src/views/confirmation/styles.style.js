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
    color: '#F5F5F5',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2, 
    fontWeight: "bold"
  },
  circleContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  personImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'white',
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: -10,
    right: -10,
    zIndex: 2,
    borderWidth: 2,
    borderColor: 'white',
  },

});

export default styles;
