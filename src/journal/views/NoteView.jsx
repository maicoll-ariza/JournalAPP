import { DeleteOutline, NoteAddOutlined, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { setActiveNote } from "../../store/journal/journalSlice"
import { starSaveNote, startDeletingNote } from "../../store/journal/thunks"
import { ImageGallery } from "../components"

import Swal from 'sweetalert2'


export const NoteView = () => {
    const dispatch = useDispatch()
    const { active:note, messageSaved, isSaving } = useSelector( state => state.Journal);
    const { title = '', body = '', date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date( date )
        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])
    
    useEffect(() => {
        if(messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    
    const onSaveNote = () => {
        dispatch( starSaveNote() )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>
            <Grid item>
                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ padding: 2 }} >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                        type='text'
                        variant='filled'
                        fullWidth
                        placeholder='Ingrese un título'
                        label='Título'
                        sx={{ border: 'none', mb: 1}}
                        name='title'
                        value={title}
                        onChange={ onInputChange } />
                        
                <TextField 
                        type='text'
                        variant='filled'
                        fullWidth
                        multiline
                        minRows={ 5 }
                        placeholder='¿Qué sucedió en el día de hoy?'
                        name={'body'}
                        value={body}
                        onChange={ onInputChange } />
            </Grid>

            <Grid 
                container
                justifyContent='end'
                >
                    <Button onClick={ onDelete }
                            sx={{ mt: 2, }}
                            color='error' >
                                <DeleteOutline />
                                Borrar
                    </Button>   
            </Grid>

            <ImageGallery />
        </Grid>
    )
}
