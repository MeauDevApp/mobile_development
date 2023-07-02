import { GiftedChat } from "react-native-gifted-chat";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDocs,
  collectionGroup,
  setDoc,
} from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { getCurrentUser, computeHash } from "../../../services/user";
import { Text, View } from "react-native";
import styles from "./styles.style";
import { ActivityIndicator } from "react-native-paper";

export default function Chat({ route, navigation }) {
  console.log(route.params);

  const getChatId = (receiver) => {
    const computedHash = computeHash(currentUserId, receiverId);
    console.log(computedHash);
    return computedHash;
  };

  const [messages, setMessages] = useState([]);
  const currentUserName = getCurrentUser().displayName;
  const currentUserId = getCurrentUser().uid;
  const receiverId = route.params.receiverId;
  const subcollectionId = getChatId(receiverId);

  const parentCollectionRef = collection(db, "chats");
  const parentDocRef = doc(parentCollectionRef, subcollectionId);
  const subcollectionRef = collection(parentDocRef, subcollectionId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMessages() {
      const subcollectionSnapshot = await getDocs(subcollectionRef);
      const chatExists = !subcollectionSnapshot.empty;

      if (chatExists) {
        const values = query(subcollectionRef, orderBy("createdAt", "desc"));
        onSnapshot(values, (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          );
        });
      } else {
        await setDoc(parentDocRef, {});
      }
    }
    getMessages();
    setLoading(false);
  }, [receiverId]);

  const sendMessage = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const parentCollectionRef21 = collection(db, "chats");
    const subcollectionRef21 = doc(parentCollectionRef21, subcollectionId);
    const { _id, createdAt, text, user } = newMessages[0];
    const docData = {
      _id,
      createdAt,
      text,
      user,
    };

    await addDoc(subcollectionRef, docData)
      .then((docs) => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {!loading && (
        <GiftedChat
          messages={messages}
          placeholder="Escreva uma mensagem"
          onSend={sendMessage}
          user={{
            _id: currentUserId,
            name: currentUserName,
          }}
        />
      )}

      {loading && messages.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sem mensagens ainda!</Text>
        </View>
      )}
    </>
  );
}
