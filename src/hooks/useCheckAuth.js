import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { starLoadNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.Auth);
    const dispatch = useDispatch();

    useEffect(() => {
        //cada vez que el estado de la autenticación cambie, se llamará esta funcion evaluando el estado
      onAuthStateChanged( FirebaseAuth, async( user ) => {
          if(!user) return dispatch( logout() )

          const {email, photoURL, uid, displayName} = user

          dispatch( login({email, photoURL, uid, displayName}))

          dispatch( starLoadNotes())
      })
    
      
    }, [])

    return {
        status
    }
 
}
