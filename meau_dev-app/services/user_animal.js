import { createUserAnimals, getUserAnimals } from "../dao/user_animals";
import { getAnimalsForAdoption } from "../dao/animal";
import { getUser } from "../dao/user";

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
      const animalRef = db.collection("animals").doc(animalId);
      const animalDoc = await animalRef.get();
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
  const currentUserDoc = await getUser(id);
  if (currentUserDoc) {
    const favoriteAnimals = await getAnimals(currentUserDoc.favorites);
    return favoriteAnimals;
  } else {
    return [];
  }
};
