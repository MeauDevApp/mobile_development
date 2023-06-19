import db from '../database/firebaseDb';
import { collection, getDocs, addDoc, setDoc, doc, query, where } from 'firebase/firestore';
import { getCurrentUser } from '../services/user';

export const getUserAnimals = async () => {
    var animals = [];
    const uid = getCurrentUser() ? getCurrentUser().uid : null;
    const q1 = query(collection(db, "animals"), where("user_id", "==", uid));

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

export const createUserAnimals = async (user, animal, idAnimal) => {
    const uid = getCurrentUser() ? getCurrentUser().uid : null;
    const userAnimalDocRef = doc(db, 'users_animals', uid);

    if ((await checkAnimalUser()).valueOf()) {
        await addAnimals(animal, idAnimal);
    } else {  
        await setDoc(userAnimalDocRef, {name: user.name})
            .then(() => {
                addAnimals(animal, idAnimal)
                console.log("Document successfully written!")
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const checkAnimalUser = async () => {
    const uid = getCurrentUser() ? getCurrentUser().uid : null;
    let isAnimalUser = false;

    await getDocs(collection(db, `users_animals`))
        .then((docs) => {
            docs.forEach((user) => {
                if (user.id === uid) {
                    isAnimalUser = true;
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
    return isAnimalUser;
};

export const addAnimals = async (animal, idAnimal) => {
    const uid = getCurrentUser() ? getCurrentUser().uid : null;
    const userAnimalDocRef = doc(db, "users_animals", uid);
    const animalsCollectionRef = collection(userAnimalDocRef, "animals");

    console.log("idAnimal", idAnimal)
    await addDoc(animalsCollectionRef, {name: animal.name, imageRef: animal.imageRef}, idAnimal)
    .then((docs) => {
        console.log("Document successfully written")
    })
    .catch((error) => {
        console.log(error);
    })
};
