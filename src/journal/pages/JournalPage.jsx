import { useDispatch, useSelector } from 'react-redux'

import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { ImageGallery } from '../components'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { startNewNote } from '../../store/journal/thunks'

const JournalPage = () => {
    const dispatch = useDispatch();
    const { isSaving, notes } = useSelector( state => state.Journal )

    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    return (
        <JournalLayout>
            {
                notes.length === 0 
                ? <NothingSelectedView />
                : <NoteView />
            }
            {/* <NoteView /> */}
            
            <IconButton
                disabled={ isSaving }
                onClick={ onClickNewNote }
                size='large'
                sx={{ 
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 40
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>


        </JournalLayout>
    )
}

export default JournalPage
