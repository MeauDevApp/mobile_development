import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacySettings = () => {
  const [chatNotifications, setChatNotifications] = useState(false);
  const [reminderNotifications, setReminderNotifications] = useState(false);
  const [eventNotifications, setEventNotifications] = useState(false);

  const handleToggleChatNotifications = () => {
    setChatNotifications(!chatNotifications);
  };

  const handleToggleReminderNotifications = () => {
    setReminderNotifications(!reminderNotifications);
  };

  const handleToggleEventNotifications = () => {
    setEventNotifications(!eventNotifications);
  };

  const handleSaveChanges = () => {
    // Logic to save the notification settings
  };

  return (
    <View style={styles.container}>
      <View style={styles.checklist}>
        <TouchableOpacity onPress={handleToggleChatNotifications}>
          <Ionicons
            name={chatNotifications ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={chatNotifications ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={styles.checklistText}>Ativar notificações de chat</Text>
      </View>

      <View style={styles.checklist}>
        <TouchableOpacity onPress={handleToggleReminderNotifications}>
          <Ionicons
            name={reminderNotifications ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={reminderNotifications ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={styles.checklistText}>Ativar notificações de recordação</Text>
      </View>

      <View style={styles.checklist}>
        <TouchableOpacity onPress={handleToggleEventNotifications}>
          <Ionicons
            name={eventNotifications ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={eventNotifications ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={styles.checklistText}>Ativar notificações de eventos</Text>
      </View>

      <Text style={styles.description}>
        Com as notificações de chat ativadas, você sempre receberá um aviso em seu celular quando alguém entrar em
        contato através do aplicativo.
      </Text>

      <Text style={styles.description}>
        Com as notificações de recordação ativadas, você será sempre lembrado de entrar em contato com o doador (caso
        você adote um animal) a fim de cumprir o requisito de acompanhamento pós adoção.
      </Text>

      <Text style={styles.description}>
        Com as notificações de eventos ativadas, você sempre receberá uma notificação para lembrá-lo dos eventos da
        semana.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  checklist: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  description: {
    marginBottom: 12,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#88c9bf',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PrivacySettings;
