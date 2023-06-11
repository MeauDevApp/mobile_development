import db from '../database/firebaseDb';
import { collection, doc, query, where } from 'firebase/firestore';
import { getDocs, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { createUserAnimal } from '../services/user_animal';

export const addAnimal = async (animal, user) => {
  const animalsCollection = collection(db, 'animals');
  await addDoc(animalsCollection, animal)
  .then((docs) => {
    console.log("Document successfully written!");
    createUserAnimal(user, animal, docs.id);
  }).catch((error) => {
    console.log("error", error);
  });
};

export const getAnimalsForAdoption = async () => {
  var animals = [];
  const q = query(collection(db, 'animals'), where("toBeAdopted", "==", true));

  await getDocs(q)
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

export const getAnimals = async () => {
  var animals = [];

  await getDocs(collection(db, 'animals'))
  .then((docs) => {
    docs.forEach((doc) => {
      animals.push(doc.data());
    });
  })
  .catch((error) => {
    console.log(error);
  });

  console.log(animals);
  return animals;
};

export const getAnimal = async (id) => {
  const animalDoc = await getDoc(doc(db, 'animals', id))

  if (animalDoc.exists())
    return animalDoc;
  else {
    console.log('No such document!');
  }
};

export const getAnimalByName = async (name) => {
  var animals = [];
  const q = query(collection(db, 'animals'), where("name", "==", name));
  await getDocs(q)
    .then((docs) => {
      docs.forEach((doc) => {
        animals.push(doc.data(), doc.id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return animals;
}

export const removeAnimal = async (id) => {
  try {
    const animalDoc = doc(db, 'animals', id);
    await deleteDoc(animalDoc);
    console.log('animal successfully deleted!');
  } catch (error) {
    console.error('Error removing animal: ', error);
  }
};

export const updateAnimal = async (id, data) => {
  try {
    const animalDoc = doc(db, 'animals', id);
    await updateDoc(animalDoc, data);
    console.log('animal successfully updated!');
  } catch (error) {
    console.error('Error updating animal: ', error);
  }
};

export const AdoptedUpdateAnimal = async (id) => {
  try {
    const animalDoc = doc(db, 'animals', id);
    await updateDoc(animalDoc, { toBeAdopted: true });
    console.log('animal successfully updated!');
  } catch (error) {
    console.error('Error updating animal: ', error);
  }
};
