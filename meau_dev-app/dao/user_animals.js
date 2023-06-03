import db from '../database/firebaseDb';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const getUserAnimals = async () => {
    var animals = [];
    const uid = getAuth().currentUser.uid;
    await getDocs(collection(db, `users_animals/${uid}/animals`))
        .then((docs) => {
            docs.forEach((doc) => {
                animals.push(doc.data());
            });
        })
        .catch((error) => {
            console.log(error);
        });

    return animals;
}

export const createUserAnimals = async (user, animal, idAnimal) => {
    const uid = getAuth().currentUser.uid;
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
}

export const checkAnimalUser = async () => {
    const uid = getAuth().currentUser.uid;
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
}

export const addAnimals = async (animal, idAnimal) => {
    const uid = getAuth().currentUser.uid;
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
}
