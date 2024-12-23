   
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../../firebase/firebaseConfig";
  
  
  export  const postData = async (collectionName , data , successAction , errorAction) => {
       
        try {
            const docRef = await addDoc(collection(db, collectionName), {
              ...data
            });
            successAction(docRef.id)
          } catch (e) {
            errorAction(e)
         }
         
 }