import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { getCurrentUser, computeHash } from "../../../services/user";


export default function Chat({ route, navigation }) {
  const getChatId = (receiverId) => {
    const computedHash = computeHash(getCurrentUser().uid, receiverId);
    return computedHash;
  };

  const [messages, setMessages] = useState([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [loading, setLoading] = useState(true);

  const receiverId = route.params.receiverId;
  const subcollectionId = getChatId(receiverId);

  const parentCollectionRef = collection(db, "chats");
  const parentDocRef = doc(parentCollectionRef, subcollectionId);
  const subcollectionRef = collection(parentDocRef, subcollectionId);

  const handleSnapshot = (snapshot) => {
    const newMessages = snapshot.docs.map((doc) => ({
      _id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      text: doc.data().text,
      user: doc.data().user,
    }));
    setMessages(newMessages);
  };

  async function getMessages() {
    const subcollectionSnapshot = await getDocs(subcollectionRef);
    const chatExists = !subcollectionSnapshot.empty;

    if (chatExists) {
      const values = query(subcollectionRef, orderBy("createdAt", "desc"));
      onSnapshot(values, handleSnapshot);
    } else {
      await setDoc(parentDocRef, {});
    }
    setLoading(false);
  }

  useEffect(() => {
    getMessages();

    return () => {
      setMessages([]);
      setLoading(true);
    };
  }, [receiverId]);

  const sendMessage = useCallback(
    async (newMessages = []) => {
      const { _id, createdAt, text, user } = newMessages[0];
      const docData = {
        _id,
        createdAt,
        text,
        user,
      };

      try {
        const updatedMessages = GiftedChat.append(messages, newMessages);
        setMessages(updatedMessages);

        await addDoc(subcollectionRef, docData);
        console.log("Document successfully written!");
      } catch (error) {
        console.log("error", error);
      }
    },
    [messages]
  );

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d3d3d3",
          },
        }}
      />
    );
  }

  async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);

      return;
    }
    setIsLoadingEarlier(true);
    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);
    setMessages((currentMessages) =>
      GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );
    setIsLoadingEarlier(false);
  }

  function mapUser(user) {
    return {
      _id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };
  }

  if (loading) return < Loading />;
  return (
    <GiftedChat
      messages={messages}
      placeholder="Escreva uma mensagem"
      onSend={sendMessage}
      user={mapUser(getCurrentUser())}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={handleLoadEarlier}
      renderBubble={renderBubble}
    />
  );
}
