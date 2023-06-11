import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.style';
import * as ImagePicker from 'expo-image-picker';

const AddPhoto = ({ onValueChange, formSubmitted }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (formSubmitted) {
      setImage(null);
    }
  }, [formSubmitted]);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onValueChange(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      {
        (image == null) ?
          <TouchableOpacity style={styles.container} onPress={chooseImage}>
            <Image style={{
                  resizeMode: 'stretch',
                  height: 24,
                  width: 24,
                }} source={require('../../../assets/control-point_119259.png')} />
            <Text style={styles.text}> Adicionar Foto</Text>
          </TouchableOpacity>
        : <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      }
    </View>
  );
}

export default AddPhoto;
