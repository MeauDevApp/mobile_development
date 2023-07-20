import { createUserAnimals, getUserAnimals } from "../dao/user_animals";
import { getAnimalsForAdoption } from "../dao/animal";
import { getUser } from "../dao/user";
import {db} from "../database/firebaseDb";
import { doc, getDoc } from "firebase/firestore";

export const createUserAnimal = (user, animal, idAnimal) => {
  createUserAnimals(user, animal, idAnimal)
};

export const getUserPets = async () => {
  return await getUserAnimals();
};

export const getAdoptionPets = async () => {
  return await getAnimalsForAdoption();
};

const getAnimals = async (animalIds) => {
  try {
    const animals = [];

    for (const animalId of animalIds) {
      console.log(animalId)
      const animalDoc = await getDoc(doc(db, 'animals', animalId))

      console.log(animalDoc.exists)
      if (animalDoc.exists) {
        animals.push({ id: animalId, ...animalDoc.data() });
      }
    }
    return animals;
  } catch (error) {
    console.error("Error fetching animals:", error);
    return [];
  }
};

export const getUserFavorites = async (id) => {
  console.log(id)
  const currentUserDoc = await getUser(id);

  if (currentUserDoc) {
    console.log(currentUserDoc.favorites)
    const favoriteAnimals = await getAnimals(currentUserDoc.favorites);
    return favoriteAnimals;
  } else {
    return [];
  }
};
