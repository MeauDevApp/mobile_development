import React, { useEffect, useState } from "react";
import { getCurrentUser, getImageBase64 } from "../../../services/user";
import { Image, View } from "react-native";
import styles from "./styles.style";

const ChatMessage = (props) => {
  const { text, uid, photoUrl } = props.message;
  const [imageBase64, setImageBase64] = useState(null);
  const messageClass = uid === getCurrentUser().uid ? 'sent' : 'received';

  useEffect(() => {
    const getImage = async () => {
      try {
        const base64 = await getImageBase64(photoUrl);
        setImageBase64(base64);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageBase64(null);
      }
    };

    if (photoUrl) {
      getImage();
    }
  }, [photoUrl]);

  return (
    <View style={styles[messageClass]}>
      {photoUrl ? (
        <Image style={styles.image} source={{ uri: imageBase64 }} />
      ) : (
        <Image
          style={styles.image}
          source={require("../../../assets/images/image_not_found.jpg")}
        />
      )}
      <p>{text}</p>
    </View>
  );
};

export default ChatMessage;
