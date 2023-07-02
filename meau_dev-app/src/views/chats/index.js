import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles.style";
import {
  getChatUsers,
  getCurrentUser,
  getInterestedPeople,
} from "../../../services/user";
import { ActivityIndicator } from "react-native-paper";
import UserCard from "../../components/userCard";

const Chats = ({ navigation }) => {
  console.log(getCurrentUser());
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatUsers = await getChatUsers();
        const users = await getInterestedPeople(chatUsers);
        setInterestedPeople(users);
        setLoading(false);
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
      {interestedPeople.map((user) => (
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
      ))}
    </ScrollView>
  );
};

export default Chats;
