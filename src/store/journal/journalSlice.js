import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       active: null
    },
    reducers: {
       savingNewNote: ( state ) => {
         state.isSaving = true
       },
       addNewEmptyNote: (state, { payload } ) => {
         state.notes.push( payload )
         state.isSaving = false
       },
       setActiveNote: (state, { payload }) => {
         state.active = payload
        state.messageSaved = ''
       },
       setNote: (state, { payload }) => {
        state.notes = payload
      },
      setSaving: (state, { payload }) => {
        state.isSaving = true;
        state.messageSaved = ''
      },
      updateNote: (state,  action ) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {
          if(note.id === action.payload.id ) {
            return action.payload
          }
          return note
        })
        state.messageSaved = `${ action.payload.title } se ha actualizado`

      },
      clearNotesLogout: ( state ) => {
        state.isSaving= false,
        state.messageSaved= '',
        state.notes= [],
        state.active= null
      },
      deleteNoteById: (state, { payload }) => {
        state.notes = state.notes.filter( note => (note.id !== payload ))
      },


       
    }
});


export const {clearNotesLogout, addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNote, setSaving, updateNote } = journalSlice.actions;