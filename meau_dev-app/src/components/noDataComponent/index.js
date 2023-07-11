import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles.style';

const NoDataComponent = ({ entity }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Não há {entity}, adicione um!</Text>
    </View>
  );
};

export default NoDataComponent;
