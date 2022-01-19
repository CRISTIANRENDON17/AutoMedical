import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';

const getCollection = async(collectionName) => {
    const result = { statusResponse: false, data: null, error: null };
    
    try {
        const datos = await getDocs(collection(db, collectionName));
        result.data = datos;
        result.statusResponse =  true;
        
    } catch (error) {
        result.error = error;        
    }
    
    return result;
}

export default getCollection;