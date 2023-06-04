import { createUserAnimals, getUserAnimals } from "../dao/user_animals";
import { getAnimalsForAdoption } from "../dao/animal";

export const createUserAnimal = (user, animal, idAnimal) => {
  createUserAnimals(user, animal, idAnimal)
};

export const getUserPets = async () => {
  return await getUserAnimals();
};

export const getAdoptionPets = async () => {
  return await getAnimalsForAdoption();
};
