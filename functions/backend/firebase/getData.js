import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export const getDaata = async (collectionName, successAction, errorAction) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        successAction(newData);
    } catch (error) {
        errorAction(error);
    }
};



export const getDataByProperty = async (collectionName, property, value, successAction, errorAction) => {
    try {
        const q = query(collection(db, collectionName), where(property, "==", value));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        successAction(newData);
    } catch (error) {
        errorAction(error);
        console.error("Error getting documents: ", error);
    }
};



export const getDataByMultipleProperties = async (collectionName, filters, successAction, errorAction) => {
    try {
        // Commencer avec une référence à la collection
        let q = collection(db, collectionName);
        
        // Ajouter les filtres
        filters.forEach(filter => {
            q = query(q, where(filter.property, filter.operator, filter.value));
        });

        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        successAction(newData);
        console.log(collectionName, newData);
    } catch (error) {
        errorAction(error);
        console.error("Error getting documents: ", error);
    }
};


export async function getDataById(collectionName, documentId ) {
  // Référence au document
  const docRef = doc(db, collectionName, documentId);
  
  try {
    // Récupérer le document
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Le document a été trouvé
      return docSnap.data();

    } else {

      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}


