import {db} from '../database/firebaseDb';
import { collection, deleteField } from 'firebase/firestore';
import { getDocs, updateDoc } from 'firebase/firestore';

export const renameAttr = async (collectionName, oldAttrName, newAttrName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach(async (doc) => {
    const docData = doc.data();

    if (oldAttrName in docData) {
      const { [oldAttrName]: oldAttrValue, ...newData } = docData;
      newData[newAttrName] = oldAttrValue;

      await removeDocAttr(doc, oldAttrName);      
      await updateDoc(doc.ref, newData);
    }
  });
};

export const removeAttr = async (collectionName, attrName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach((doc) => removeDocAttr(doc, attrName));
};

export const removeDocAttr = async (doc, attrName) => {
  await updateDoc(doc.ref, {
    [attrName]: deleteField()
  });
};

export const updateAllAttrFields = async (collectionName, attrName, value) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  snapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      [attrName]: value
    });
  });
};
