import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles.style';

export default Button = ({ props }) => {
  const [token, setToken] = useState('');

  handleProps = () => {
    // props.needAuth == true ? needs be redirect to props page otherwise can be moved to the next page²
    // temporaty solution above
    // token ? navi
  }

  return (
    <>
      <TouchableOpacity style={ this.props == "greenButton" ? styles.greenButton : styles.default } >
        <Text style={styles.textInput }> { props.text } </Text>
        {/* <Icon name='google-' size={15}/> */}
      </TouchableOpacity>
    </>
  );
}
