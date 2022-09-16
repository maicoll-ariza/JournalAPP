
import { signInWithGoogle, registerUserWithEmailAndPassword,loginWithEmailAndPassword, logoutFirebase } from "../../firebase/provider";
import { checkingCredential, logout, login } from "./"
import { clearNotesLogout } from '../journal/journalSlice'

export const checkingAuthentication = ( email, password) => {

    return async( dispatch) => {
        dispatch( checkingCredential());

    }

}

export const startGoogleSignIn = () => {

    return async( dispatch ) =>{
        dispatch( checkingCredential() );
        const result = await signInWithGoogle();
        if( !result.ok) return dispatch( logout(result.errorMessage) )

        dispatch( login( result ))
        
    }
}

export const starRegisterUserWithEmailAndPassword = ({ email, password, displayName}) => {
    return async(dispatch) => {
        dispatch( checkingCredential());
        const { uid, photoURL, ok, errorMessage} = await registerUserWithEmailAndPassword({ email, password, displayName})
        if( !ok ) return dispatch( logout( errorMessage ))

        dispatch( login({ uid, email, displayName, photoURL }))
    }
}

export const startSignInWithEmailAndPassword = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredential());
        const { ok, displayName, photoURL, uid, errorMessage} = await loginWithEmailAndPassword(email, password);
        console.log({displayName, email, photoURL, uid, errorMessage})
        if(ok) return dispatch( login({ displayName, email, photoURL, uid }));

        dispatch( logout({ errorMessage }))
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch( logout())

    }
}