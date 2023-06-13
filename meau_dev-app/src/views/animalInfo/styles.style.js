import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: width / (height/3)
  },
  namePet: {
    color: '#434343',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  button: {
    width: '32%',
    height: 40,
    backgroundColor: '#88c9bf',
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#434343',
  },
  alingItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 14,
    color: '#589b9b',
    fontFamily: "Roboto_400Regular",
  },
  content: {
    color: '#757575',
    fontSize: 16,
  },
  column: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 0 
  },
});

export default styles;