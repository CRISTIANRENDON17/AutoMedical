import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from './firebase';

 export const getCollection = async(collectionName) => {
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

export const addUser = async(collectionName, data) => {
    const result = { statusResponse: false, data: null, error: null };

    try {
        console.log("Datos a registrar: ",data);
        const datos = await addDoc(collection(db,collectionName), data);  
                   
        result.statusResponse =  true;        
        result.data = datos.id;
    } catch (error) {
        result.error = error;        
    }
    
    return result;
}

export const getUser = async(identification, email) => {
    const result = { statusResponse: false, data: null, error: null, userIdExiste: false, userEmailExiste: false };

    try {        
        const qId = query(collection(db,"usuarios"), where("identification", "==", parseInt(identification)));
        const userById = await getDocs(qId);
        const dataIdUser = userById?.docs[0]?.data();         
                
        const qEmail = query(collection(db,"usuarios"), where("email", "==", email));
        const userByEmail = await getDocs(qEmail);
        const dataEmailUser = userByEmail?.docs[0]?.data();
                
        result.userIdExiste = dataIdUser !== undefined && true;
        result.userEmailExiste = dataEmailUser !== undefined && true;                           
        result.statusResponse =  true;                    
        result.data = dataIdUser !== undefined ? dataIdUser : dataEmailUser;
        
    } catch (error) {
        result.error = error;        
    }
    
    return result;
}