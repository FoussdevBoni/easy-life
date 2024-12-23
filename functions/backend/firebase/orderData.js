import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";

/**
 * Récupère et ordonne les données d'une collection Firestore.
 * @param {string} collectionName - Le nom de la collection Firestore.
 * @param {string} orderField - Le champ sur lequel l'ordre sera basé.
 * @param {"asc" | "desc"} [orderDirection="asc"] - La direction de l'ordre ("asc" pour ascendant, "desc" pour descendant).
 * @returns {Promise<Array>} - Une promesse qui retourne un tableau des documents triés.
 */
export async function orderedData(collectionName, orderField, orderDirection = "asc" , successAction , errorAction) {
  try {
    const ref = collection(db, collectionName);
    const q = query(ref, orderBy(orderField, orderDirection));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    successAction(data)
     ;
  } catch (error) {
    errorAction(error)
    console.error("Erreur lors de la récupération des données triées :", error);
    throw error;
  }
}
