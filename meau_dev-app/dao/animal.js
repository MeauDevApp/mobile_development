import db from '../database/firebaseDb';
import { arrayUnion, collection, doc, query, where } from 'firebase/firestore';
import { getDocs, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getCurrentUser } from '../services/user';

export const addAnimal = async (animal) => {
  const animalsCollection = collection(db, 'animals');

  await addDoc(animalsCollection, animal)
  .then((docs) => {
    console.log("Document successfully written!");
  }).catch((error) => {
    console.log("error", error);
  });
};

export const updateAnimalInterestedPeople = async (id, animal) => {
  const animalDoc = doc(db, 'animals', id);
  const uid = getCurrentUser() ? getCurrentUser().uid : null;

  try {
    await updateDoc(animalDoc, {
      interestedPeople: arrayUnion(uid)
    });

    console.log("Array updated successfully!");
  } catch (error) {
    console.error("Error updating array:", error);
  }
};

export const getAnimalsForAdoption = async () => {
  var animals = [];
  const uid = getCurrentUser() ? getCurrentUser().uid : null;
  const q1 = query(collection(db, "animals"),where("toBeAdopted", "==", true),where("user_id", "!=", uid));

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

export const AdoptedUpdateAnimal = async (id, condition) => {
  try {
    const animalDoc = doc(db, 'animals', id);
    await updateDoc(animalDoc, { toBeAdopted: condition });
    console.log('animal successfully updated!');
  } catch (error) {
    console.error('Error updating animal: ', error);
  }
};
