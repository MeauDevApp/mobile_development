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

const Chats = ({ navigation }) => {
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatUsers = await getChatUsers();
        console.log(chatUsers)
        const users = await getInterestedPeople(chatUsers);
        setInterestedPeople(users);
        setLoading(false);
        console.log(users)
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
