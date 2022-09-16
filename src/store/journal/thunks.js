import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote, updateNote, setSaving, deleteNoteById } from './journalSlice';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( savingNewNote() )
        //Con la función getState accedemos al store
        const { uid } = getState().Auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        //Conseguimos la referencia del lugar de nuestra baseDeDatos donde queremos agregar el nuevo valor
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote)

        newNote.id = newDoc.id
        //! dispatch
        dispatch( addNewEmptyNote( newNote ))
        dispatch( setActiveNote( newNote ))
        
    }

}

export const starLoadNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().Auth

        if( !uid ) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes( uid );

        dispatch( setNote( notes ))
    }

}

export const starSaveNote = () => {
    return async( dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().Auth
        const { active:note } = getState().Journal 

        const newNoteToFirestore = { ...note }
        delete newNoteToFirestore.id
        const docRef =  doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await setDoc( docRef, newNoteToFirestore, { merge: true })

        dispatch( updateNote(note) )
        
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {
        const { uid } = getState().Auth
        const { active: note } = getState().Journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ))

    }
}