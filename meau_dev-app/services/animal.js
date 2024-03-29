import {
  AdoptedUpdateAnimal,
  addAnimal,
  getAnimal,
  getAnimalByName,
  getAnimals,
  removeAnimal,
  updateAnimal,
} from "../dao/animal";
import db from '../database/firebaseDb';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../database/firebaseDb";
import { createUserAnimal } from "./user_animal";
import { collection, getDocs, updateDoc } from "firebase/firestore";

export const create = async (animal, user) => {
  try {
    addAnimal(animal, user);
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
}

export const remove = (id) => {
  return removeAnimal(id);
};

export const update = (id, data) => {
  return (data === "toBeAdopted") 
  ? AdoptedUpdateAnimal(id)
  : updateAnimal(id, data);
};

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

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
