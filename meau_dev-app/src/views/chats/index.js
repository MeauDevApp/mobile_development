import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles.style";
import {
  getChatUsers,
  getInterestedPeople,
} from "../../../services/user";
import { ActivityIndicator } from "react-native-paper";
import UserCard from "../../components/userCard";
import NoDataComponent from "../../components/noDataComponent";
import { useSelector } from "react-redux";

const Chats = ({ navigation }) => {
  const userStore = useSelector((state) => state.user);
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userStore && userStore.user.id) {
          const chatUsers = await getChatUsers(userStore.user.id);
          // const subcollectionId = getChatId(receiverId);
          // const parentCollectionRef = collection(db, "chats");
          // const parentDocRef = doc(parentCollectionRef, subcollectionId);
          // const subcollectionRef = collection(parentDocRef, subcollectionId);

          const users = await getInterestedPeople(chatUsers);

          setInterestedPeople(users);
          setLoading(false);
          console.log(users)
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {interestedPeople.length > 0 ? (
        interestedPeople.map((user) => (
          <View key={user.uid} style={styles.chats} >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  receiverId: user.uid,
                })
              }
            >
              <UserCard user={user} />
            </TouchableOpacity>
          </View>
      ))
    ) : (
      <NoDataComponent entity={'chats'} />
    )}
    </ScrollView>
  );
};

export default Chats;
