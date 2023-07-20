import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addAnimalToFavorites, removeAnimalFromFavorites } from '../../../services/user';

const FavoriteHeart = ({ id, isLiked, userId, animalId }) => {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked); // Update the state when the prop changes
  }, [isLiked]);

  const handleHeartClick = () => {
    console.log("handleHeartClick");
    setLiked(!liked);
    console.log("Here mf");
    // setIsFavorited(!isFavorited)
    if (!liked) {
      addAnimalToFavorites(userId, animalId);
    } else {
      removeAnimalFromFavorites(userId, animalId);
    }
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
