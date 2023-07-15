import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoriteHeart = ({ id, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleHeartClick = () => {
    setLiked(!liked);
  };

  return (
    <TouchableOpacity onPress={handleHeartClick}>
      <Ionicons
        name={liked ? 'heart' : 'heart-outline'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default FavoriteHeart;
