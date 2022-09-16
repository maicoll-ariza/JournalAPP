import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const { uid, displayName, email, photoURL} = result.user

        return {
            ok: true,
            uid, 
            displayName,
            email, 
            photoURL
        }
    } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailAndPassword = async({ email, password, displayName}) =>{
    
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL} = resp.user
        //current user es es usuario logueado
        await updateProfile(FirebaseAuth.currentUser, { displayName })
        return {
            ok: true,
            uid, 
            photoURL,
            email, 
            password,
            displayName
        }
    } catch (error) {
        if(error.message === 'Firebase: Error (auth/email-already-in-use).') {
            const errorMessage = 'El correo de registro ya se encuentra en uso. Intenta con otro.'
            return {
                ok: false,
                errorMessage,
            }
        }
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL, displayName } = result.user
      return {
        ok: true,
        uid,
        email,
        displayName,
        photoURL
      }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut()
}