import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ id, body, title = '', date, imageURL = [] }) => {
    const dispatch = useDispatch()

    const activeNewNote = () => {
        dispatch( setActiveNote({ id, title, body, date, imageURL}) )
    }

    const newTitle = useMemo(() => {
        return title.length > 17 
        ? title.substring( 0, 17) + '...'
        : title
    }, [ title ])

    return (
        <ListItem  disablePadding
        onClick={ activeNewNote }>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
