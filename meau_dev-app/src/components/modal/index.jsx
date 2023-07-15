import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import styles from "./styles.style";
import { getInterestedPeople } from '../../../services/user';
import UserCard from '../userCard';

const CustomModal = ({ visible, userIds, onClose, imageArray }) => {
  const [loading, setLoading] = useState(true);
  const [interestedPeople, setInterestedPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userIds);
        if (userIds.length > 0) {
          const users = await getInterestedPeople(userIds);
          setInterestedPeople(users);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Pessoas interessadas:</Text>
          <View>
            {interestedPeople.length > 0 ? (
              interestedPeople.map((user, index) => (
                <React.Fragment key={index}>
                  <UserCard user={user} />
                </React.Fragment>
              ))
            ) : (
              <Text style={styles.item}>Não há pessoas interessadas no momento.</Text>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
