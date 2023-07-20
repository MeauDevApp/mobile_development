import {
  AdoptedUpdateAnimal,
  addAnimal,
  getAnimal,
  getAnimalByName,
  getAnimals,
  removeAnimal,
  removeAnimalInterestedPeople,
  updateAnimal,
  updateAnimalInterestedPeople,
} from "../dao/animal";
import db from "../database/firebaseDb";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../database/firebaseDb";
import { createUserAnimal } from "./user_animal";
import { collection, getDocs, updateDoc } from "firebase/firestore";

export const create = async (animal) => {
  try {
    addAnimal(animal);
  } catch (error) {
    console.log(error);
  }
};

export const getAll = () => {
  return getAnimals();
};

export const get = (id) => {
  return getAnimal(id);
};

export const getByName = (name) => {
  return getAnimalByName(name);
};

export const remove = (id) => {
  return removeAnimal(id);
};

export const updatedInterested = async (id) => {
  updateAnimalInterestedPeople(id);
};

export const removeAdoptionPet = (id) => {
  return AdoptedUpdateAnimal(id, false);
};

export const update = (id, data) => {
  return data === "toBeAdopted"
    ? AdoptedUpdateAnimal(id, true)
    : updateAnimal(id, data);
};

export const changeOwner = (id, newOwnerId) => {
  try {
    updateAnimal(id, { user_id: newOwnerId });
  } catch (error) {}
};

export const searchAdoptionAnimals = async (field, data) => {
  var animals = [];
  const uid = getCurrentUser() ? getCurrentUser().uid : null;
  const q1 = query(
    collection(db, "animals"),
    where(field, "==", value),
    where("user_id", "!=", uid)
  );

  await getDocs(q1)
    .then((docs) => {
      docs.forEach((doc) => {
        animals.push(doc.data());
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return animals;
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const getImageBase64 = async (path) => {
  if (!path) return null;

  try {
    const reference = ref(storage, path);
    const url = await getDownloadURL(reference);

    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    return base64;
  } catch (error) {
    console.log("Error retrieving image from Firebase Storage:", error);
    return "";
  }
  
};

export const removeInterested = (id, idInterested) => {
  try {
    removeAnimalInterestedPeople(id, idInterested);
  } catch (error) {}
};
