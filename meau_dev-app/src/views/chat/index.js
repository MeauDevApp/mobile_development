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
import { useSelector } from "react-redux";
import db from "../../../database/firebaseDb";
import { computeHash } from "../../../services/user";
import Loading from "../../components/loading";

const Chat = ({ route, navigation }) => {
  const userStore = useSelector((state) => state.user);

  const getChatId = (receiverId) => {
    const computedHash = computeHash(userStore.user.id, receiverId);
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

   const getMessages = async () => {
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
      getMessages();
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

  const renderBubble = (props) => {
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

  const handleLoadEarlier = async () =>  {
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

  const mapUser = () => {
    return {
      _id: userStore.user.id,
      name: userStore.user.name,
      avatar: userStore.user.imageRef,
    };
  }

  if (loading) return <Loading />;
  return (
    <GiftedChat
      messages={messages}
      placeholder="Escreva uma mensagem"
      onSend={sendMessage}
      user={mapUser()}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={handleLoadEarlier}
      renderBubble={renderBubble}
    />
  );
}

export default Chat;
