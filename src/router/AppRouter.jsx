
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { FirebaseAuth } from '../firebase/config';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { login, logout } from '../store/auth';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {

    const { status } = useCheckAuth()
    

    if ( status === 'checking' ) {
        return <CheckingAuth />
    } 

    return (
        <Routes>
            {
                (status==='authenticated') 
                ?<Route path='/*' element={ <JournalRoutes />} />
                :<Route path='/auth/*' element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to={'/auth/login'} />} />
            

        </Routes>
    )
}
