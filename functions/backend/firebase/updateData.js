import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export const updateData = async (collectionName, docId, updatedData , successAction , errorAction) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document successfully updated!");
    if (successAction) {
     successAction()
    }
  } catch (error) {
    if (errorAction) {
      errorAction()
    }
  }
};


