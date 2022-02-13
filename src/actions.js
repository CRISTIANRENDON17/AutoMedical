import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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

/**
 * Método para insertar un usuario
 * @param {} collectionName Nombre de la colección en Firebase
 * @param {Usuario} data Objeto con la información del nuevo usuario
 * @returns Object Usuario
 */
export const addUser = async(collectionName, data) => {
    const result = { statusResponse: false, data: null, error: null };

    try {
        console.log("Datos a registrar: ",data);
        const datos = await addDoc(collection(db,collectionName), data);  
                   
        result.statusResponse =  true;        
        result.data = datos.id;
    } catch (error) {
        console.log("Error al registrar usuario: ", error);
        result.error = error;        
    }
    
    return result;
}

/**
 * Método para obtener un usuario por medio de la Identificación o el Correo Electrónico
 * @param {} identification Identificación del usuario a buscar
 * @param {} email Correo Electrónico del usuario a buscar
 * @returns Identifiación o Correo Elctrónico 
 */
export const getUser = async(identification, email) => {
    const result = { statusResponse: false, data: null, error: null, userIdExiste: false, userEmailExiste: false };

    try {
        const qId = query(collection(db,"usuarios"), where("identification", "==", identification));
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

/**
 * Método para obtener un usuario por medio de la Identificación o el Correo Electrónico
 * @param {} identification Identificación del usuario a buscar
 * @returns Identifiación o Correo Elctrónico 
 */
 export const getIdUser = async(identification) => {
    const result = { statusResponse: false, data: null, error: null };

    try {
        const qId = query(collection(db,"usuarios"), where("identification", "==", identification));
        const userById = await getDocs(qId);
        const dataIdUser = userById.docs.map(doc => doc.id);       
                                            
        result.statusResponse =  true;                    
        result.data = dataIdUser !== undefined && dataIdUser;
        
    } catch (error) {
        result.error = error;        
    }
    
    return result;
}

/**
 * Método para obtener un usuario por medio de la Identificación o el Correo Electrónico
 * @param {} data Identificación del id del usuario y datos a actualizar
 * @returns Resultado del 
 */
 export const updateFieldUser = async(data) => {
    const result = { statusResponse: false, data: null, error: null };

    try {
        const usuarios = doc(db, 'usuarios', data.identificacion); 
        var obj = {}
        obj[data.fieldName] = data.value;
        await setDoc(usuarios, obj, { merge: true }).then(() =>{ result.statusResponse = true; });                 
    } catch (error) {
        result.error = error;        
    }    
    return result;
}

/**
 * Método para actualizar campos del usuario
 * @param {} data Información del usuario a actualizar
 * @returns Estado 
 */
 export const updateUserById = async(data) => {
    const result = { statusResponse: false, data: null, error: null };

    try {  
        const qId = query(collection(db,"usuarios"), where("identification", "==", data.identification));
        const userById = await getDocs(qId);
        const user = doc(db, 'usuarios', userById?.docs[0]?.id);
        setDoc(user,{   address : data.address,
                        age: data.age, 
                        cellNumber : data.cellNumber,
                        phoneNumber : data.phoneNumber,
                        fullName : data.fullName,
                    }, { merge: true }
        ); 
        result.statusResponse =  true;                        
    } catch (error) {
        result.error = error;   
        console.log("Error: ",error);     
    }
    return result;
}

/**
 * Método para enviar el correo electrónico y restaurar la contraseña
 * @param {} email Correo Electrónico usuario para enviar email
 * @returns Estado respuesta envío de correo 
 */
export const sendEmailResetPassword = async(email) => {
    const result = { statusResponse: false, error: null};
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email)
            .then(e => {
                console.log("Vamos bien: ",e);
                result.statusResponse = true; 
            }) 
    } catch (error) {
        console.log("Vaya!: ",error);
        result.error = error.message;
    }
    return result;
}

/**
 * Método para registrar el agendamiento de una cita
 * @param {Agendamientos} data Objeto con la información del nuevo agendamiento
 * @returns Object Agendamiento 
 */
export const registrarAgendamiento = async(data) => {
    const result = { statusResponse: false, error: null};
    try {
        console.log("Datos a registrar: ",data);
        const datos = await addDoc(collection(db,'agendamientos'), data);  
                   
        result.statusResponse =  true;        
        result.data = datos.id;
    } catch (error) {
        console.log("Error al agendar: ",error);
        result.error = error.message;
    }
    return result;
}

export const getSchedulesByUser = async(email) => {
    console.log("Email usuario: ", email);
    const result = { statusResponse: false, data: null, error: null };

    try {
        const queryAgendas = query(collection(db,"agendamientos"), where("correoUsuario", "==", email));
        const agendas = await getDocs(queryAgendas);
        const dataSchedules = agendas?.docs[0]?.data();  
        const arrayAgendas = agendas.docs.map( doc => ({ id: doc.id, ...doc.data() }))
                                           
        result.statusResponse =  dataSchedules !== undefined && true;                    
        result.data = dataSchedules !== undefined && arrayAgendas;
        
    } catch (error) {
        result.error = error;        
    }
    
    return result;
}

export const updateStateScheduleById = async(id) => {
    const result = { statusResponse: false, data: null, error: null };

    try {
        //const deleteResult = await deleteDoc(doc(db, "agendamientos", id));  
        const agenda = doc(db, 'agendamientos', id);
        setDoc(agenda, { estadoAgenda: "Cancelada" }, { merge: true });                                          
        result.statusResponse =  true;
        
    } catch (error) {
        result.error = error;   
        console.log("Error: ",error);     
    }
    
    return result;
}